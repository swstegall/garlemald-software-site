*Updated as of commit 38014f8(2016-08-19)*

The following commands are available as part of the Project Meteor Server.
They can be used by typing their usage examples into the chat box within the game.

## Standard commands

### help

<table>
  <tr>
    <th>help</th>
    <td>Prints out a list of available commands</td>
  </tr>
  <tr>
    <th rowspan="2">Usage</th>
    <td>!help</td>
  </tr>
  <tr>
    <td>!help &lt;command&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;command&gt;</th>
    <td>Brings up the help description for the given command</td>
  </tr>
</table>

### mypos

<table>
  <tr>
    <th>mypos</th>
    <td>Prints out your absolute location in the current region</td>
  </tr>
  <tr>
    <th>Usage</th>
    <td>!mypos</td>
  </tr>
</table>

### music

<table>
  <tr>
    <th>music</th>
    <td>Plays music &lt;id&gt; to player</td>
  </tr>
  <tr>
    <th>Usage</th>
    <td>!music &lt;id&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;id&gt;</th>
    <td>Plays the music defined at &lt;id&gt;. Refer to Music for a list of IDs</td>
  </tr>
</table>

### warp

<table>
  <tr>
    <th>warp</th>
    <td>Warp to a location from a list, or enter a &lt;zone&gt; with coordinates &lt;x&gt; &lt;y&gt; &lt;z&gt;</td>
  </tr>
  <tr>
    <th rowspan="3">Usage</th>
    <td>!warp &lt;spawn list&gt;</td>
  </tr>
  <tr>
    <td>!warp &lt;zone&gt; &lt;x&gt; &lt;y&gt; &lt;z&gt;</td>
  </tr>
  <tr>
    <td>!warp &lt;zone&gt; &lt;x&gt; &lt;y&gt; &lt;z&gt; &lt;privateArea&gt; &lt;targetname&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;spawn list&gt;</th>
    <td>The ID from the list of locations as defined in server_zones_spawnlocations in the database</td>
  </tr>
  <tr>
    <th>&lt;zone&gt;</th>
    <td>Value of the zone to head to.  Refer to Regions for the list of zone IDs</td>
  </tr>
  <tr>
    <th>&lt;X&gt;</th>
    <td>X Position</td>
  </tr>
  <tr>
    <th>&lt;Y&gt;</th>
    <td>Y Position</td>
  </tr>
  <tr>
    <th>&lt;Z&gt;</th>
    <td>Z Position</td>
  </tr>
  <tr>
    <th>&lt;privateArea&gt;</th>
    <td>Warp into a defined private area of a given zone ID</td>
  </tr>
  <tr>
    <th>&lt;targetname&gt;</th>
    <td>Name of player to select remotely. Two words, firstname &amp; lastname, separated by a space</td>
  </tr>
</table>

### nudge

<table>
  <tr>
    <th>nudge</th>
    <td>Positions your character forward a set &lt;distance&gt;, defaults to 5 units</td>
  </tr>
  <tr>
    <th rowspan="3">Usage</th>
    <td>!nudge</td>
  </tr>
  <tr>
    <td>!nudge &lt;distance&gt;</td>
  </tr>
  <tr>
    <td>!nudge &lt;distance&gt; &lt;up/down&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;distance&gt;</th>
    <td>The amount of units to move forward</td>
  </tr>
  <tr>
    <th>&lt;up/down&gt;</th>
    <td>Nudge vertically instead.  Up, U, or +, for moving up.  Down, D, or -, for moving down</td>
  </tr>
</table>

### speed

<table>
  <tr>
    <th>speed</th>
    <td>Set movement speed for player. Enter no value to reset to default</td>
  </tr>
  <tr>
    <th rowspan="3">Usage</th>
    <td>!speed</td>
  </tr>
  <tr>
    <td>!speed &lt;run&gt;</td>
  </tr>
  <tr>
    <td>!speed &lt;stop&gt; &lt;walk&gt; &lt;run&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;stop&gt;</th>
    <td>Stationary speed (does nothing for players)</td>
  </tr>
  <tr>
    <th>&lt;walk&gt;</th>
    <td>Walking speed</td>
  </tr>
  <tr>
    <th>&lt;run&gt;</th>
    <td>Running speed</td>
  </tr>
</table>

## Server Administration commands

### giveitem

<table>
  <tr>
    <th>giveitem</th>
    <td>Adds &lt;item&gt; &lt;qty&gt; to &lt;location&gt; for player or &lt;targetname&gt;</td>
  </tr>
  <tr>
    <th rowspan="3">Usage</th>
    <td>!giveitem &lt;item&gt; &lt;qty&gt;</td>
  </tr>
  <tr>
    <td>!giveitem &lt;item&gt; &lt;qty&gt; &lt;location&gt;</td>
  </tr>
  <tr>
    <td>!giveitem &lt;item&gt; &lt;qty&gt; &lt;location&gt; &lt;targetname&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;item&gt;</th>
    <td>Item ID to give, as defined in xtx_itemName</td>
  </tr>
  <tr>
    <th>&lt;qty&gt;</th>
    <td>Quantity of item to add</td>
  </tr>
  <tr>
    <th>&lt;location&gt;</th>
    <td>Inventory location to go into (eg, Bag, Key Item, Loot, Currency) as defined in global.lua from the scripts folder. <br/> Defaults to INVENTORY_COMMON</td>
  </tr>
  <tr>
    <th>&lt;targetname&gt;</th>
    <td>Name of player to select remotely. Two words, firstname &amp; lastname, separated by a space</td>
  </tr>
</table>

### givegil

<table>
  <tr>
    <th>givegil</th>
    <td>Adds gil &lt;qty&gt; to player or &lt;targetname&gt;</td>
  </tr>
  <tr>
    <th rowspan="2">Usage</th>
    <td>!givegil &lt;qty&gt;</td>
  </tr>
  <tr>
    <td>!givegil &lt;qty&gt; &lt;targetname&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;qty&gt;</th>
    <td>Quantity of gil to add</td>
  </tr>
  <tr>
    <th>&lt;targetname&gt;</th>
    <td>Name of player to select remotely. Two words, firstname &amp; lastname, separated by a space</td>
  </tr>
</table>

### givecurrency

<table>
  <tr>
    <th>givecurrency</th>
    <td>Adds &lt;item&gt; to currency by amount &lt;qty&gt; to player or &lt;targetname&gt;</td>
  </tr>
  <tr>
    <th rowspan="2">Usage</th>
    <td>!givecurrency &lt;item&gt; &lt;qty&gt;</td>
  </tr>
  <tr>
    <td>!givecurrency &lt;item&gt; &lt;qty&gt; &lt;targetname&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;item&gt;</th>
    <td>Item ID to give, as defined in xtx_itemName</td>
  </tr>
  <tr>
    <th>&lt;qty&gt;</th>
    <td>Quantity of item to add</td>
  </tr>
  <tr>
    <th>&lt;targetname&gt;</th>
    <td>Name of player to select remotely. Two words, firstname &amp; lastname, separated by a space</td>
  </tr>
</table>

### givekeyitem

<table>
  <tr>
    <th>givekeyitem</th>
    <td>Adds &lt;keyitem&gt; to player or &lt;targetname&gt;</td>
  </tr>
  <tr>
    <th rowspan="2">Usage</th>
    <td>!giveitem &lt;keyitem&gt;</td>
  </tr>
  <tr>
    <td>!giveitem &lt;keyitem&gt; &lt;target name&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;keyitem&gt;</th>
    <td>Item ID to give, as defined in xtx_itemName</td>
  </tr>
  <tr>
    <th>&lt;targetname&gt;</th>
    <td>Name of player to select remotely. Two words, firstname &amp; lastname, separated by a space</td>
  </tr>
</table>

### delitem

<table>
  <tr>
    <th>delitem</th>
    <td>Removes &lt;item&gt; &lt;qty&gt; from &lt;location&gt; for player or &lt;targetname&gt;</td>
  </tr>
  <tr>
    <th rowspan="3">Usage</th>
    <td>!delitem &lt;item&gt; &lt;qty&gt;</td>
  </tr>
  <tr>
    <td>!delitem &lt;item&gt; &lt;qty&gt; &lt;location&gt;</td>
  </tr>
  <tr>
    <td>!delitem &lt;item&gt; &lt;qty&gt; &lt;location&gt; &lt;targetname&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;item&gt;</th>
    <td>Item ID to remove, as defined in xtx_itemName</td>
  </tr>
  <tr>
    <th>&lt;qty&gt;</th>
    <td>Quantity of item to remove</td>
  </tr>
  <tr>
    <th>&lt;location&gt;</th>
    <td>Inventory location to remove from (eg, Bag, Key Item, Loot, Currency) as defined in global.lua from the scripts folder. <br/> Defaults to INVENTORY_COMMON</td>
  </tr>
  <tr>
    <th>&lt;targetname&gt;</th>
    <td>Name of player to select remotely. Two words, firstname &amp; lastname, separated by a space</td>
  </tr>
</table>

### delcurrency

<table>
  <tr>
    <th>delcurrency</th>
    <td>Removes currency &lt;qty&gt; from player or &lt;targetname&gt;</td>
  </tr>
  <tr>
    <th rowspan="2">Usage</th>
    <td>!delcurrency &lt;item&gt; &lt;qty&gt;</td>
  </tr>
  <tr>
    <td>!delcurrency &lt;item&gt; &lt;qty&gt; &lt;targetname&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;item&gt;</th>
    <td>Item ID to give, as defined in xtx_itemName</td>
  </tr>
  <tr>
    <th>&lt;qty&gt;</th>
    <td>Quantity of item to add</td>
  </tr>
  <tr>
    <th>&lt;targetname&gt;</th>
    <td>Name of player to select remotely. Two words, firstname &amp; lastname, separated by a space</td>
  </tr>
</table>

### delkeyitem

<table>
  <tr>
    <th>delkeyitem</th>
    <td>Removes &lt;keyitem&gt; from player or &lt;targetname&gt;</td>
  </tr>
  <tr>
    <th rowspan="2">Usage</th>
    <td>!delkeyitem &lt;keyitem&gt;</td>
  </tr>
  <tr>
    <td>!delkeyitem &lt;keyitem&gt; &lt;target name&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;keyitem&gt;</th>
    <td>Item ID to remove, as defined in xtx_itemName</td>
  </tr>
  <tr>
    <th>&lt;targetname&gt;</th>
    <td>Name of player to select remotely. Two words, firstname &amp; lastname, separated by a space</td>
  </tr>
</table>

### weather

<table>
  <tr>
    <th>weather</th>
    <td>Change the weather client-side to &lt;id&gt; and optional &lt;transition&gt; for player</td>
  </tr>
  <tr>
    <th rowspan="3">Usage</th>
    <td>!weather &lt;id&gt;</td>
  </tr>
  <tr>
    <td>!weather &lt;id&gt; &lt;transition&gt;</td>
  </tr>
  <tr>
    <td>!weather &lt;id&gt; &lt;transition&gt; &lt;zonewide&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;id&gt;</th>
    <td>Changes to the weather defined at &lt;id&gt;. Refer to Weather for a list of IDs</td>
  </tr>
  <tr>
    <th>&lt;transition&gt;</th>
    <td>Fades from the current weather effect to the next one, in seconds</td>
  </tr>
  <tr>
    <th>&lt;zonewide&gt;</th>
    <td>Sets the weather change to every player within the same zone</td>
  </tr>
</table>

## Debug commands

### endevent

<table>
  <tr>
    <th>endevent</th>
    <td>Passes endEvent() to player or &lt;targetname&gt; to close a script</td>
  </tr>
  <tr>
    <th rowspan="2">Usage</th>
    <td>!endevent</td>
  </tr>
  <tr>
    <td>!endevent &lt;targetname&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;targetname&gt;</th>
    <td>Name of player to select remotely. Two words, firstname &amp; lastname, separated by a space</td>
  </tr>
</table>

### sendpacket

<table>
  <tr>
    <th>sendpacket</th>
    <td>Sends a custom &lt;packet&gt; to player or &lt;targetname&gt;</td>
  </tr>
  <tr>
    <th rowspan="2">Usage</th>
    <td>!sendpacket &lt;packet&gt;</td>
  </tr>
  <tr>
    <td>!sendpacket &lt;packet&gt; &lt;targetname&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;packet&gt;</th>
    <td>Filename of the packet to look for from within a folder named <code>packets</code> in the Map Server directory</td>
  </tr>
  <tr>
    <th>&lt;targetname&gt;</th>
    <td>Name of player to select remotely. Two words, firstname &amp; lastname, separated by a space</td>
  </tr>
</table>

### graphic

<table>
  <tr>
    <th>graphic</th>
    <td>Changes appearance for equipment with given parameters</td>
  </tr>
  <tr>
    <th>Usage</th>
    <td>!graphic &lt;slot&gt; &lt;wID&gt; &lt;eID&gt; &lt;vID&gt; &lt;cID&gt;</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="2">Parameters</th>
  </tr>
  <tr>
    <th>&lt;slot&gt;</th>
    <td>Slot type</td>
  </tr>
  <tr>
    <th>&lt;wID&gt;</th>
    <td>Weapon type</td>
  </tr>
  <tr>
    <th>&lt;eID&gt;</th>
    <td>Equipment type</td>
  </tr>
  <tr>
    <th>&lt;vID&gt;</th>
    <td>Variant type</td>
  </tr>
  <tr>
    <th>&lt;cID&gt;</th>
    <td>Color type</td>
  </tr>
</table>

**Parameter Breakdown**

| **slot** | **weaponID** | **equipID** | **variantID** | **colorID** |
| --- | --- | --- | --- | --- |
| 0 - ??? | ??? | Height? | ??? | ??? |
| 1 – Colors | EyeColor | HairColor | SkinColor | ?? |
| 2 – Head? | ??? | FaceType/Eyes | FacialFeatures | ??? |
| 3 – Hair | ??? | HairStyle | Highlight | ??? |
| 4 - ??? |   |   |   |   |
| 5 - MainHand | Model | SubType | Variant | Color Where Applicable |
| 6 - OffHand | Model | SubType | Variant | Color Where Applicable |
| 7 - Special Mainhand | Model | SubType | Variant | Color Where Applicable |
| 8 - Special Offhand | Model | SubType | Variant | Color Where Applicable |
| 9 - Throwing | Model | SubType | Variant | Color Where Applicable |
| 10 - Pack | Model | SubType | Variant | Color Where Applicable |
| 11 - Pouch | Model | SubType | Variant | Color Where Applicable |
| 12 - Head | ??? | Model | Variant | Color Where Applicable |
| 13  - Body | ??? | Model | Variant | Color Where Applicable |
| 14 - Legs | ??? | Model | Variant | Color Where Applicable |
| 15 - Hands | ??? | Model | Variant | Color Where Applicable |
| 16 - Feet | ??? | Model | Variant | Color Where Applicable |
| 17 - Belt | ??? | Model | Variant |   |
| 18 - Neck | ??? | Model | ??? | ??? |
| 19 - Right Ear | ??? | Model | ??? | ??? |
| 20 - Left Ear | ??? | Model | ??? | ??? |
| 21 - Right Wrist | ??? | Model | ??? | ??? |
| 22 - Left Wrist | ??? | Model | ??? | ??? |
| 23 - Right Ring #1 | ??? | Model | ??? | ??? |
| 24 - Left Ring #1 | ??? | Model | ??? | ??? |
| 25 - Right Ring #2 | ??? | Model | ??? | ??? |
| 26 - Left Ring #2 | ??? | Model | ??? | ??? |
| 27 - ??? |   |   |   |   |

*Warning: Improper weapon combinations/objects placed in slots 5 and/or 6 can crash the game.  Ex. Dual-wielding swords.*

[Kyne's list of IDs](https://docs.google.com/spreadsheets/d/1VPLeavtXps31guP0ADXTsTTjX4eMK-VwrvDug7kHVso/edit#gid=370822967)

[Paru's list of IDs](https://docs.google.com/document/d/1DJq3fp-3omlZ4Bsejd5tPhAb3ZvYczdVpSZO4QGWG3Y/edit?usp=sharing)
