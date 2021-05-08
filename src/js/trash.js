// Category filter function
function setField() {
  db.collection('category')
    .doc('GvUne578sLRy43lhNApJ')
    .update({
      filter: {
        brands: 'Ishlab chiqaruvchilar',
        operation: {
          arr: ['2.2 kg', '2.3 kg', '2 kg', '4 kg', '3.5 kg'],
          title: 'Vazni',
        },
        storage: {
          title: 'Tezkor xotira',
          arr: [
            '4 GB DDR',
            '6 GB DDR',
            '8 GB DDR',
            '32 GB DDR',
            '64 GB DDR',
            '128 GB DDR',
          ],
        },
        origin: {
          title: 'Protsessor',
          arr: [
            'Intel Core I 2',
            'Intel Core I 3',
            'Intel Core I 4',
            'Intel Core I 5',
            'Intel Core I 6',
            'Intel Core I 7',
          ],
        },
        price: 'Narxlar',
      },
    });
}
