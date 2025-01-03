export const fetchGSoCOrganizations = async (top?: boolean, filters: any = {}): Promise<any[]> => {
    try {
        console.log('Fetching GSoC organizations...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gsoc/orgs?top=${top}&filters=${filters && JSON.stringify(filters)}`, {
            method: 'GET',
            cache: 'force-cache',
            credentials: 'include',
        });
        const data = await response.json();
        return data.organizations;
    } catch (error) {
        console.error('Error fetching GSoC organizations:', error);
        throw error;
    }
};

export const fetchGSoCOrganizationsNames = async (): Promise<any[]> => {
    try {
        console.log('Fetching GSoC organizations...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gsoc/orgs/name`, {
            method: 'GET',
            cache: 'force-cache',
            credentials: 'include',
        });
        const data = await response.json();
        return data.organizations;
    } catch (error) {
        console.error('Error fetching GSoC organizations:', error);
        throw error;
    }
};

export const fetchGSoCOrgDetails = async (id: any): Promise<any> => {
    try {
        console.log('Fetching GSoC organizations...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gsoc/orgs/details?orgId=${id}`, {
            method: 'GET',
            cache: 'force-cache',
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching GSoC organizations:', error);
        throw error;
    }
};
