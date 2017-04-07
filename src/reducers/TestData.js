export const generateTestData = () => {

    let data = [];

    for (let i = 0; i < 100; i += 1) {

        let value = parseInt(Math.random() * 200 + 2000, 10);

        data.push({id: i, name: `item ${i}`, price: value});
    }

    return data;
}
