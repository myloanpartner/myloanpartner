export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'https://api.myloanpartner.in/v1',
    TIMEOUT: 10000,
};

export const ENDPOINTS = {
    CONTACT: '/contact',
    LEAD: '/lead-magnet',
    CALCULATOR: '/calculator-stats'
};

class ApiService {
    async request(endpoint, options = {}) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, config);

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('[API Error]', error);
            // Re-throw to let components handle the error (e.g., show error message)
            throw error;
        }
    }

    async submitContactForm(data) {
        return this.request(ENDPOINTS.CONTACT, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async submitLead(data) {
        return this.request(ENDPOINTS.LEAD, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

export const apiService = new ApiService();
