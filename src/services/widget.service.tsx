export const getWidgetData = async (clientKey: string, dataReceived: any) => {
    const dummyBody = {
        currency: 'USD',
        items: [{ unit_cost: '200.00' }],
        locale: 'en_US',
    };
    console.log(dataReceived, 'Data received in getWidgetData');

    const result = await fetch(
        `https://api.sandbox.protecht.com/api/internal/widgets/icw/configure/v4`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-protecht-api-key': clientKey,
            },
            body: JSON.stringify(dataReceived || dummyBody),
        }
    );

    return result.json();
};
