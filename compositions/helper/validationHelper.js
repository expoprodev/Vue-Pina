import {helpers} from "@vuelidate/validators";

export const passwordValidator = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ ~`! @#$%^&*()_\-+={[}]|\\:;"'<,>.?\/])[A-Za-z\d ~`! @#$%^&*()_\-+={[}]|\\:;"'<,>.?\/\\]{8,}$/)