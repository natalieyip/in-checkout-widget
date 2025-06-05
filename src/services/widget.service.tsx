export const getWidgetData = async () => {
    const dummyBody = {
        currency: 'USD',
        items: [{ unit_cost: '200.00' }],
        locale: 'en_US',
    };

    const apikey = import.meta.env.VITE_PROTECHT_API_KEY;
    const baseUrl = import.meta.env.VITE_PROTECHT_API_BASE_URL;
    
    const result =  await fetch(`${baseUrl}/api/internal/widgets/icw/configure/v4`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-protecht-api-key': apikey || '',
        },
        body: JSON.stringify(dummyBody),
      });

      return result.json();
}
