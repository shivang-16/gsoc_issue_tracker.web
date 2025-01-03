export const fetchGSoCOrganizations = async (top?: boolean, filters: any = {}): Promise<any[]> => {
    try {
        console.log('Fetching GSoC organizations...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gsoc/orgs?top=${top}&filters=${filters && JSON.stringify(filters)}`, {
            method: 'GET',
            cache: 'force-cache',
        });
        const data = await response.json();
        return data.organizations;
    } catch (error) {
        console.error('Error fetching GSoC organizations:', error);
        throw error;
    }
};
