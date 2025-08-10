export const AppConfig = {
    APP_NAME: 'Salam Payment',
    APP_VERSION: '1.0.0',
    API_URL: import.meta.env.VITE_API_URL as string,
    ALLOWED_SPECIAL_CHARACTER_REGEX: /[@\/\\.\-_,&’ ]/,
    ALLOWED_SPECIAL_CHARACTER_BUYER_NAME_REGEX: /[`~*";:]/,
}
