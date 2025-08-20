export const PaymentConfig = {
    FPX_API_URL: import.meta.env.VITE_FPX_URL as string,
    FPX_CREATE_PAYMENT_URL: `${import.meta.env.VITE_FPX_URL as string}/FPXMain/seller2DReceiver.jsp`,
}
