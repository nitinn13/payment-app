export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.getElementById('razorpay-script')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.id = 'razorpay-script';
    script.async = true;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    
    document.body.appendChild(script);
  });
};

declare global {
  interface Window {
    Razorpay: any;
  }
}