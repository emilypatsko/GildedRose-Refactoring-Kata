import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should pass the Golden Master test', function() {

        // Arrange
        const items = [
            new Item("+5 Dexterity Vest", 10, 20), //
            new Item("Aged Brie", 2, 0), //
            new Item("Elixir of the Mongoose", 5, 7), //
            new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
            new Item("Sulfuras, Hand of Ragnaros", -1, 80),
            new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
            new Item("Conjured Mana Cake", 3, 6)
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
            new Item("Conjured Mana Cake", -5, 0)
        ];

        // Assert
        expect(updatedItems).to.deep.include.members(testArr);        
    });

    it('should never change the sellIn or quality of Sulfuras', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 0, 80) ]);
        const updatedItems = gildedRose.updateQuality();
        expect(updatedItems[0].sellIn).to.equal(0);
        expect(updatedItems[0].quality).to.equal(80);
    });

    it('should calculate quality of aged brie correctly', function() {
        const gildedRose = new GildedRose([ 
            new Item('Aged Brie', 2, 0),
            new Item('Aged Brie', 4, 40)
        ]);
        for (let i = 0; i < 6; i++) {
            gildedRose.updateQuality();
        }
        const updatedItems = gildedRose.items;
        expect(updatedItems).to.deep.include.members([
            new Item('Aged Brie', -4, 10),
            new Item('Aged Brie', -2, 48)
        ]);
    });

    it('should calculate quality of backstage passes correctly', function() {
        const gildedRose = new GildedRose([ 
            new Item('Backstage passes to a TAFKAL80ETC concert', 12, 36),
            new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10)
        ]);
        for (let i = 0; i < 8; i++) {
            gildedRose.updateQuality();
        }
        const updatedItems = gildedRose.items;
        expect(updatedItems).to.deep.include.members([
            new Item('Backstage passes to a TAFKAL80ETC concert', 4, 50),
            new Item('Backstage passes to a TAFKAL80ETC concert', -2, 0)
        ]);       
    });

    it('should calculate quality of regular items correctly', function() {
        const gildedRose = new GildedRose([
            new Item('Elixir of the Mongoose', 4, 48),
            new Item('Elixir of the Weasel', 6, 9),
            new Item('Elixir of the Beaver', 7, 10)
        ]);
        for (let i = 0; i < 8; i++) {
            gildedRose.updateQuality();
        }
        const updatedItems = gildedRose.items;
        expect(updatedItems).to.deep.include.members([
            new Item('Elixir of the Mongoose', -4, 36),
            new Item('Elixir of the Weasel', -2, 0),
            new Item('Elixir of the Beaver', -1, 1)
        ])
    });

    it('should degrade the quality of conjured items twice as fast', function () {
        const gildedRose = new GildedRose([
            new Item('Conjured Mana Cake', 2, 13),
            new Item('Conjured Chocolate Cake', 1, 13)
        ]);
        for (let i = 0; i < 4; i++) {
            gildedRose.updateQuality();
        }
        const updatedItems = gildedRose.items;
        expect(updatedItems).to.deep.include.members([
            new Item('Conjured Mana Cake', -2, 1),
            new Item('Conjured Chocolate Cake', -3, 0)
        ]);
    });
});
