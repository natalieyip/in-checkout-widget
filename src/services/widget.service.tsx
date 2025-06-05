export const getWidgetData = async () => {
    const dummyBody = {
        currency: 'USD',
        items: [{ unit_cost: '200.00' }],
        locale: 'en_US',
    };
    
    const result =  await fetch(`https://api.sandbox.protecht.com/api/internal/widgets/icw/configure/v4`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dummyBody),
      });

      return result.json();
}
