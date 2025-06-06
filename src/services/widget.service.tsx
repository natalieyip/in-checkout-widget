export const getWidgetData = async (clientKey: string, dataReceived: any) => {
    const result = await fetch(
        `https://api.sandbox.protecht.com/api/internal/widgets/icw/configure/v4`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-protecht-api-key': clientKey,
            },
            body: JSON.stringify(dataReceived),
        }
    );

    return result.json();
};
