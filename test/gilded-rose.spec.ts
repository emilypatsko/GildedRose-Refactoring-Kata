import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    // Arrange
    it('should update quality correctly', function() {
        const items = [
            new Item("+5 Dexterity Vest", 10, 20), //
            new Item("Aged Brie", 2, 0), //
            new Item("Elixir of the Mongoose", 5, 7), //
            new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
            new Item("Sulfuras, Hand of Ragnaros", -1, 80),
            new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
            // this conjured item does not work properly yet
            // new Item("Conjured Mana Cake", 3, 6)];
        ];
        const gildedRose = new GildedRose(items);

        // Act
        for (let i = 0; i < 8; i++) {
            gildedRose.updateQuality();
        }        
        const updatedItems = gildedRose.items;
        
        // names should be the same
        // sellIn values should be [2, -6, -3, 0, -1, 7, 2, -3, -5]
        // quality values should be [12, 14, 0, 80, 80, 31, 50, 0, -20]
        const testArr = [
            new Item("+5 Dexterity Vest", 2, 12),
            new Item("Aged Brie", -6, 14),
            new Item("Elixir of the Mongoose", -3, 0),
            new Item("Sulfuras, Hand of Ragnaros", 0, 80),
            new Item("Sulfuras, Hand of Ragnaros", -1, 80),
            new Item("Backstage passes to a TAFKAL80ETC concert", 7, 31),
            new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50),
            new Item("Backstage passes to a TAFKAL80ETC concert", -3, 0),
            //    new Item("Conjured Mana Cake", -5, 0)
        ];

        // Assert
        expect(updatedItems).to.deep.include.members(testArr);        
    })

});
