export const getWidgetData = async () => {
    const dummyBody = {
        currency: 'USD',
        items: [{ unit_cost: '200.00' }],
        locale: 'en_US',
    };

    const API_KEY = import.meta.env.VITE_PROTECHT_API_KEY;

    const result = await fetch(
        `https://api.sandbox.protecht.com/api/internal/widgets/icw/configure/v4`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-protecht-api-key': API_KEY,
            },
            body: JSON.stringify(dummyBody),
        }
    );

    return result.json();
};
