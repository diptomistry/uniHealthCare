class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(resource, params = {}) {
        const url = new URL(`${this.baseURL}/${resource}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    async post(resource, data, config = {}) {
        const url = `${this.baseURL}/${resource}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    async put(resource, data, config = {}) {
        const url = `${this.baseURL}/${resource}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    async delete(resource) {
        const url = `${this.baseURL}/${resource}`;
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }

    async upload(resource, file, additionalData = {}) {
        const formData = new FormData();
        formData.append('file', file);

        // Append any additional data
        Object.keys(additionalData).forEach(key => {
            formData.append(key, additionalData[key]);
        });

        const url = `${this.baseURL}/${resource}`;
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }
}

const baseUrl = 'http://127.0.0.1:8000/api';
const apiService = new ApiService(baseUrl);

export default apiService;
