import { defineStore } from "pinia";
import SetupServiceApi from "@/services/setupService.js";
import router from "@/router/index.js";
import { PlotlyIcons } from "@/constants/plotlyIcons.js";

export const useSetupResultStore = defineStore({
  id: "setupResult",
  state: () => {
    return {
      hasChanged: 0,
      selectedTab: 0,
      tabs: [],
      setup: {
        cluster: {},
        fields: {},
        modelName: "",
        modelType: "",
        name: "",
        simulationConfig: {}
      },
      selectedField: "",
      isLoading: true,
      crumbs: [
        { title: "Home", destination: { name: "Home" } },
        { title: "Results", destination: { name: "SetupResultsList" } },
        {
          title: "SetupResultDetail",
          destination: {
            name: 'SetupResultDetail',
            params: { modelName: router.currentRoute.value.params.modelName }
          }
        }
      ]
    }
  },
  getters: {
    modelName: () => {
      return router.currentRoute.value.params.modelName
    },
  },
  actions: {
    async onSaveClicked() {
      SetupServiceApi.saveTabConfigurations(this.modelName, this.tabs).then((res) => {
        console.log(res)
      })
    },
    onPrintClicked(containerId) {
      const prtContent = document.getElementById(containerId);
      const WinPrint = window.open('', '', 'left=0,top=0,width=' + prtContent.clientWidth + ',height=' + prtContent.clientHeight + ',toolbar=0,scrollbars=0,status=0');
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
    onExpandClicked(tab, chart) {
      console.log(tab, chart)
    },
    async onFieldChange() {
      if (!this.tabs[this.selectedTab].menus) {
        this.tabs[this.selectedTab].menus = []
      }
      let menus = this.tabs[this.selectedTab].menus;

      if (menus.some((menuItem) => menuItem.fieldName == this.selectedField.fieldName)) {
        return 'duplicated'
      }

      const menu = {
        rotation: 0,
        weight: 6,
        fieldName: this.selectedField.fieldName,
        fieldType: this.selectedField.fieldType,
        labelX: this.selectedField.labelX,
        labelY: this.selectedField.labelTime,
      }
      menus.push(menu)
      this.$patch((state) => {
        state.isLoading = true
      })
      menu.chart = await this.getChartData(menus[menus.length - 1], "tab_" + this.selectedTab + "_" + menus.length)
      this.$patch((state) => {
        state.isLoading = false
        state.hasChanged = state.hasChanged + 1
      })

      return 'added'
    },
    triggerChange() {
      this.$patch((state) => {
        state.hasChanged = state.hasChanged + 1
      })
    },
    async onTabClicked(tabIndex) {
      this.selectedTab = tabIndex
      const store = this
      let menus = (this.tabs[tabIndex] && this.tabs[tabIndex].menus) || [];
      for (const menu of menus) {
        if (!menu.chart) {
          menu.chart = await store.getChartData(menu, "tab_" + tabIndex + "_" + menus.indexOf(menu))
        }
      }

      this.$patch({ tabs: store.tabs })
    },
    async getChartData(menu, chartId) {
      const store = this
      const setupChart = await SetupServiceApi.getChart(this.modelName, menu.fieldName)
      const setupChartData = setupChart.data
      let chart = {
        chartId: chartId,
        traces: [
          {
            x: [],
            y: [],
            z: [],
            mode: "heatmap",
            type: "",
          }
        ],
        layout: {
          xaxis: menu.labelX,
          yaxis: menu.labelY,
        },
        config: {
          responsive: true,
          modeBarButtonsToAdd: [],
          modeBarButtonsToRemove: ['resetscale', 'autoscale', 'zoom', 'pan']
        }
      };

      if (menu.fieldType === 1) {
        // noinspection JSSuspiciousNameCombination
        chart.traces = [
          {
            x: setupChartData.times,
            y: setupChartData.x,
            z: setupChartData.data,
            type: "heatmap",
            mode: "",
          }
        ]
      } else {
        let traces = [];
        for (let i = 0; i < setupChartData.data[0].length - 1; i++) {
          const xAxisData = setupChartData.times;
          const yAxisData = setupChartData.data.map((item, index) => {
            return setupChartData.data[index][i]
          });
          traces.push({
            x: xAxisData,
            y: yAxisData,
            type: "scatter",
            mode: "lines",
          })
        }

        chart.traces = traces
      }

      chart.config.modeBarButtonsToAdd = [
        {
          name: 'Print',
          icon: PlotlyIcons.print,
          direction: 'up',
          click: function () {
            store.onPrintClicked(chart.chartId)
          }
        },
        {
          name: 'Expand',
          icon: PlotlyIcons.expand,
          direction: 'up',
          click: function () {
            menu.weight = menu.weight === 12 ? 6 : 12
            window.dispatchEvent(new Event('resize'));
            store.triggerChange()
          }
        },
        {
          name: 'Reverse',
          icon: PlotlyIcons.rotation,
          direction: 'up',
          click: function () {
            const xaxis = menu.chart.layout.xaxis
            menu.chart.layout.xaxis = menu.chart.layout.yaxis
            menu.chart.layout.yaxis = xaxis
            for (let i = 0; i < menu.chart.traces.length; i++) {
              const tempX = menu.chart.traces[i].x;
              menu.chart.traces[i].x = menu.chart.traces[i].y
              menu.chart.traces[i].y = tempX

            }
            store.triggerChange()
          }
        }
      ]
      return chart
    },
    async init() {
      this.$patch({ isLoading: true })
      const setupFields = await SetupServiceApi.getSetup(this.modelName)
      /**
       * layout api does not return response
       */
      let tabConfigurations = await SetupServiceApi.getTabConfigurations(this.modelName)

      if (!tabConfigurations.data.length) {
        const defaultTabs = [
          { id: 'tab1', label: 'Selection 1', menus: [] },
          { id: 'tab2', label: 'Selection 2', menus: [] },
          { id: 'tab3', label: 'Selection 3', menus: [] },
          { id: 'tab4', label: 'Selection 4', menus: [] },
        ]
        await this.saveLayout(defaultTabs)
        tabConfigurations = await SetupServiceApi.getTabConfigurations(this.modelName)
      }

      this.$patch((state) => {
        state.setup = setupFields.data
        state.tabs = tabConfigurations.data
      })
      await this.onTabClicked(0)
      this.$patch({ isLoading: false })
    },
    saveTabsNames(newNames) {
      this.tabs[0].label = newNames[0]
      this.tabs[1].label = newNames[1]
      this.tabs[2].label = newNames[2]
      this.tabs[3].label = newNames[3]
    },
    async saveLayout(tabs) {
      await SetupServiceApi.saveTabConfigurations(this.modelName, tabs)
    }
  }
});
