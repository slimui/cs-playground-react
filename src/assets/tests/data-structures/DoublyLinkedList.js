export const tail = `
if (
  typeof DoublyLinkedList === 'function' &&
  typeof new DoublyLinkedList() === 'object'
) {
  DoublyLinkedList.prototype.__print = function() {
    if (this.head == null) {
      return null;
    } else {
      var result = [];
      var node = this.head;
      while (node.next != null) {
        result.push(node.value);
        node = node.next;
      };
      result.push(node.value);
      return result;
    };
  }
  DoublyLinkedList.prototype.__printReverse = function() {
    if (this.tail == null) {
      return null;
    } else {
      var result = [];
      var node = this.tail;
      while (node.prev != null) {
        result.push(node.value);
        node = node.prev;
      };
      result.push(node.value);
      return result;
    };
  }
}

  const checkNodes = (list) => {
    if (typeof list.head.next === 'undefined' ||
        typeof list.head.prev === 'undefined' ||
        typeof list.head.value === 'undefined') {
      console.log('WARNING: Nodes must have <code>next</code>, <code>prev</code> and <code>value</code> properties for tests to work!');
      return null;
    }
  }
`;

export const tests = [
  {
    expression: `typeof new DoublyLinkedList() === 'object'`,
    message: 'The <code>DoublyLinkedList</code> data structure exists'
  },
  {
    expression: `(() => { const list = new DoublyLinkedList(); return list.head === null && list.tail === null && list.length === 0 })()`,
    message: 'The <code>DoublyLinkedList</code> data structure should have <code>head</code>, <code>tail</code> and <code>length</code> properties, which initialize to <code>null</code>, <code>null</code> and <code>0</code>, respectively'
  },
  {
    expression: `typeof new DoublyLinkedList().add === 'function'`,
    message: 'The <code>DoublyLinkedList</code> class should have a method called <code>add</code>.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      checkNodes(list);
      return list.head.value === 'cat' && list.tail.value === 'cat';
    })()`,
    message: 'The <code>add</code> method should assign the first node added to the <code>head</code> and <code>tail</code> properties.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      list.add('pig');
      return list.__print().join('') === 'catdogbirdpig' && list.__printReverse().join('') === 'pigbirddogcat' && list.tail.next === null && list.head.prev === null;
    })()`,
    message: 'Additional elements should be appended to the list\'s tail, and each node should keep track of both the next and previous nodes.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      const test_1 = list.length;
      list.add('bird');
      list.add('pig');
      const test_2 = list.length === 4;
      return test_1 && test_2;
    })()`,
    message: 'The <code>length</code> property of The <code>DoublyLinkedList</code> class should increment every time <code>add</code> is called to reflect the number of nodes in the linked list.'
  },
  {
    expression: `typeof new DoublyLinkedList().remove === 'function'`,
    message: 'The <code>DoublyLinkedList</code> class should have a method called <code>remove</code>, which accepts an element to remove as an argument.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      list.remove('cat');
      const test_1 = list.head.value === 'dog' && list.head.prev === null;
      list.remove('dog');
      const test_2 = list.head === null && list.tail === null;
      return test_1 && test_2;
    })()`,
    message: 'When the first node is removed, <code>head</code> should assume the value of the removed node\'s <code>next</code> value, and if truthy, should have a <code>prev</code> value set to <code>null</code>.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      list.remove('bird');
      const test_1 = list.tail.value === 'dog' &&
        list.tail.prev.value === 'cat' &&
        list.tail.next === null;
      list.remove('dog');
      const test_2 = list.head.next === null;
      list.remove('cat');
      return test_1 && test_2 &&
        list.tail === null &&
        list.head === null;
    })()`,
    message: 'The tail node can be removed, when the list has <em>one or more nodes</em>, and references to previous & next nodes should be correctly maintained.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      list.remove('dog');
      return list.head.value === 'cat' &&
        list.head.next.value === 'bird' &&
        list.head.next.prev.value === 'cat';
    })()`,
    message: 'When an element that is neither the head or tail node is removed, the linked list structure, and references to previous & next nodes should be maintained.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('bird');
      list.add('pig');
      list.add('cow');
      const test_1 = list.remove('cat') && list.length === 3;
      const test_2 = list.remove('pig') && list.length === 2;
      const test_3 = list.remove('cow') && list.length === 1;
      const test_4 = list.remove('bird') && list.length === 0;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'For every node removed from the list, the <code>remove</code> method should return a truthy value and decrement the <code>length</code> of the list by one.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      const test_1 = list.remove('cat') === null;
      list.add('dog');
      list.add('cat');
      const test_2 = list.remove('bird') === null;
      return test_1 && test_2 && list.length === 2;
    })()`,
    message: 'If <code>remove</code> is called on an empty list, or finds no matching value to remove, <code>null</code> should be returned and the list\'s length property should remain unchanged.'
  },
  {
    expression: `typeof new DoublyLinkedList().removeAt === 'function'`,
    message: 'The <code>DoublyLinkedList</code> class should have a method called <code>removeAt</code>, which accepts an index and an element to remove as arguments.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      list.add('fish');

      // remove 'dog' at index 1; second node is bird, and bird.prev is cat
      const test_1 = list.removeAt(1) === 'dog' &&
        list.head.next.value === 'bird' &&
        list.head.next.prev.value === 'cat';

      // remove 'cat' at head; new head is bird, bird.prev is null, second node is fish, fish.prev is bird
      const test_2 = list.removeAt(0) === 'cat' &&
        list.head.value === 'bird' &&
        list.head.prev === null &&
        list.head.next.value === 'fish' &&
        list.head.next.prev.value === 'bird';

      // remove 'fish' at index 1; head is bird, bird.next is null, tail is also now bird, bird.prev is null
      const test_3 = list.removeAt(1) === 'fish' &&
        list.head.next === null &&
        list.tail.value === 'bird' &&
        list.tail.prev === null;

      // remove 'bird' from head/tail (last node), both head and tail are null
      const test_4 = list.removeAt(0) === 'bird' &&
        list.head === null &&
        list.tail === null;

      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>removeAt</code> method should remove and return the value at the given index, while retaining the linked list structure/references (consider each of the cases outlined in the <code>list.remove(\'val\')</code> tests above).'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      list.add('kitten');
      const test_1 = list.length === 3;
      list.removeAt(1);
      const test_2 = list.length === 2;
      list.removeAt(1);
      const test_3 = list.length === 1;
      // list.removeAt(1); // no change
      list.removeAt(0);
      const test_4 = list.length === 0;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>removeAt</code> method should decrement the <code>length</code> of the list by one for every node removed from the list.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      const test_1 = list.removeAt(0) === null;
      list.add('cat');
      const test_2 = list.removeAt(1) === null;
      const test_3 = list.removeAt(5) === null;
      const test_4 = list.removeAt(-5) === null;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>removeAt</code> method should return <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty.'
  },
  {
    expression: `typeof new DoublyLinkedList().addAt === 'function'`,
    message: 'The <code>DoublyLinkedList</code> class should have a method called <code>addAt</code>, which accepts an index and an element to add as arguments.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      list.addAt(1, 'bird');
      return list.head.value === 'cat' &&
             list.head.next.value === 'bird' &&
             list.head.next.prev.value === 'cat' &&
             list.tail.value === 'dog' &&
             list.tail.prev.value === 'bird';
    })()`,
    message: 'The <code>addAt</code> method should add the given value to the list at the given index, while maintaining the linked-list structure/references.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.addAt(0, 'bird');
      return list.head.value === 'bird' &&
             list.head.prev === null &&
             list.tail.value === 'cat' &&
             list.tail.prev.value === 'bird' &&
             list.tail.next === null;
    })()`,
    message: 'When the given index is <code>0</code>, the value passed to <code>addAt</code> should become the new head node, referencing the rest of the list in its <code>next</code> property.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      const test_1 = list.addAt(0, 'cat') === null;
      list.add('cat');
      list.add('dog');
      const test_2 = list.addAt(4, 'cat') === null;
      const test_3 = list.addAt(-4, 'cat') === null;
      return test_1 && test_2 && test_3;
    })()`,
    message: 'The <code>addAt</code> method should return <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty.'
  },
  {
    expression: `
    (() => {
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      list.addAt(0, 'bird');
      list.addAt(1, 'fish');
      return list.length === 4;
    })()`,
    message: 'The <code>addAt</code> method should increment the <code>length</code> of the linked list by one for each new node added to the list.'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'peekHead')) {
        return 'DISABLED';
      }
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      const peek = list.peekHead();
      return peek.value === 'cat' && peek.next.value === 'dog'
    })()`,
    message: 'The <code>peekHead</code> method should return the <code>head</code> property of the <code>DoublyLinkedList</code> structure, so that you can easily and visually inspect the list.'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'peekTail')) {
        return 'DISABLED';
      }
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      const peek = list.peekTail();
      return peek.value === 'dog' && peek.prev.value === 'cat'
    })()`,
    message: 'The <code>peekTail</code> method should return the <code>tail</code> property of the <code>DoublyLinkedList</code> structure, so that you can easily and visually inspect the list.'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'indexOf')) {
        return 'DISABLED';
      }
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      list.add('bird');
      const test_1 = list.indexOf('bird') === 2;
      list.add('pig');
      list.add('cow');
      const test_2 = list.indexOf('cow') === 4;
      list.remove('dog');
      const test_3 = list.indexOf('bird') === 1;
      return test_1 && test_2 && test_3;
    })()`,
    message: 'The <code>indexOf</code> method should return the zero-based index of the given element.'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'indexOf')) {
        return 'DISABLED';
      }
      const list = new DoublyLinkedList();
      const test_2 = list.indexOf('dog') === -1;
      list.add('cat');
      const test_1 = list.indexOf('dog') === -1;
      return test_1 && test_2;
    })()`,
    message: 'The <code>indexOf</code> method should return <code>-1</code> if the given element doesn\'t exist, or if the method is called on an empty list.'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'elementAt')) {
        return 'DISABLED';
      }
      const list = new DoublyLinkedList();
      list.add('cat');
      list.add('dog');
      const test_1 = list.elementAt(1) === 'dog';
      const test_2 = list.elementAt(0) === 'cat';
      list.add('pig');
      list.add('bird');
      list.add('toad');
      const test_3 = list.elementAt(3) === 'bird';
      list.remove('bird');
      const test_4 = list.elementAt(3) === 'toad';
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>elementAt</code> method should return the element at the given index.'
  },
  {
    expression: `
    (() => {
      if (isTestDisabled(DoublyLinkedList, 'elementAt')) {
        return 'DISABLED';
      }
      const list = new DoublyLinkedList();
      const test_1 = list.elementAt(0) === null;
      list.add('cat');
      const test_2 = list.elementAt(1) === null;
      const test_3 = list.elementAt(5) === null;
      const test_4 = list.elementAt(-5) === null;
      return test_1 && test_2 && test_3 && test_4;
    })()`,
    message: 'The <code>elementAt</code> method should return <code>null</code> if the given index is less than <code>0</code>, greater than or equal to the length of the list, or if the list is empty.'
  },
];
