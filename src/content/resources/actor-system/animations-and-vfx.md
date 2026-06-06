## How it works

When an animation is required to play on an actor an "animationId" is used to define both the animation that is played as well as the particle effect that may accompany it. This "id" is actually a bitpacked value
in the following format:

<table>
  <tr>
    <th colspan="12">VFX Number</th>
    <th colspan="12">Animation Number</th>
    <th colspan="8">VFX Category</th>
  </tr>
  <tr>
    <td>0</td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
    <td>9</td>
    <td>10</td>
    <td>11</td>
    <td>12</td>
    <td>13</td>
    <td>14</td>
    <td>15</td>
    <td>16</td>
    <td>17</td>
    <td>18</td>
    <td>19</td>
    <td>20</td>
    <td>21</td>
    <td>22</td>
    <td>23</td>
    <td>24</td>
    <td>25</td>
    <td>26</td>
    <td>27</td>
    <td>28</td>
    <td>29</td>
    <td>30</td>
    <td>31</td>
  </tr>
</table>

- **Animation Number:** The specific file number to play within the animation category folder (see below).
- **VFX Category:** Sets the VFX folder category that will be play from.
- **VFX Number:** The specific file number to play within the VFX category folder (see below).

If you look inside your `FFXIV Install Folder/client/` folder, you will notice a `chara` and `vfx` folder. The former contains model and animation info for every pc, monster, and object model. Based on the actor model and it's state,
an animation category folder path will be made. For example a Hyur male in a passive state standing will load animation files in thise folder `FINAL FANTASY XIV/client/chara/pc/c001/act/cmn/em1/base/`. The animation number provided matches the numbered
files in this folder. Therefore we can deduce all possible animations for a specific set of state.

The particle effect portion is stored in the `VFX` folder. Unlike animations, the category to load from is not based on state and rather is provided. See below for the mapping between the category number and folder name. For example category `5`
is provided with the VFX number `30`. This means the particle effect `FINAL FANTASY XIV/client/vfx/itm/0030` will be loaded and played along with the animation.

Note that some animations/vfx were not implemented or required to be paired with each other (such as the throw snowball animation and snowball effect). Animations may also include sound effects as well.

## Animation Categories

| Category Folder | Description |
| --- | --- |
| em1 | Animations while passive. |
| em2 | Animations while sitting on the floor. |
| em3 | Animations while sitting on a chair. |
| lib |   |
| lil |   |
| lui |   |
| fid | Field idle animations. Set on NPCs using a motion pack. |
| bid | Battle idle animations. |
| rid | Riding idle animations. |
| sid | Sitting idle animations. |
| atk | Auto attack animations. |
| mgc | Magic casting animations. |
| wsc | Weapon Skill animations. |
| btl | Throwing animations. |

## VFX Categories

| Cat# | Hex | Category Folder | Description |
| --- | --- | --- | --- |
| 1 | 0x01 | mgk | Magic effects. |
| 2 | 0x02 | sys |   |
| 3 | 0x03 | etc |   |
| 4 | 0x04 | lib | Various effects and animations. |
| 5 | 0x05 | emt | Item / Emote effects for passive state. |
| 6 | 0x06 | em1 | Item / Emote effects for active state? |
| 7 | 0x07 | em2 | Item / Emote effects for sitting on an object. |
| 8 | 0x08 | em3 | Item / Emote effects for sitting on the ground. |
| 9 | 0x09 | em4 | Item / Emote effects for an unknown state. Tries to call 'em4' folder from character model, perhaps placeholder for mounts? |
| 10 | 0x0A | kao |   |
| 11 | 0x0B | glx | Three bitshifted values for displaying a guildleve plate.  Causes character to animate with em1/4001 to throw the guildleve up |
| 12 | 0x0C | gly | Three bitshifted values for displaying a guildleve plate.  Does nothing with the character.  Meant for receiving a shared guildleve perhaps? |
| 13 | 0x0D | cbi |   |
| 14 | 0x0E | abl | Ability effects. |
| 15 | 0x0F | pop | Spawning effects. |
| 16 | 0x10 | cft | Crafting effects (success/fail/etc). |
| 17 | 0x11 | btl |   |
| 18 | 0x12 | wsc | Weapon Skill Character effects. |
| 19 | 0x13 | wss | Monster Skill effects. |
| 20 | 0x14 | pic | Gathering effects (using buffs, swing animations on character) |
| 21 | 0x15 | liu | Hand animations. |
| 22 | 0x16 | lin |   |
| 23 | 0x17 | lif |   |
| 24 | 0x18 | lil | Speaking animations. |
| 25 | 0x19 | atk |   |
| 33 | 0x21 | wss | Same as 19? |
| 111 | 0x6F | n/a | Chanting effects (casting a spell/song/etc) w/ actor posing |
| 112 | 0x70 | n/a | Chanting effects (casting a spell/song/etc) w/o actor posing |
| 113 | 0x71 | n/a | Spiritbond effect. Animation number dictates which equipment glows |
| 120 | 0x78 | n/a | Sounds associated with the death animation that setState plays? |
| 124 | 0x7C | n/a | Old notes say "Sheath/Unsheath", but that isn't the whole story. |
| 126 | 0x7E | n/a | Footstep effects?  Eg. Dust, grass, water being kicked up from the model's foot. |
| 127 | 0x7F | n/a | Seems to interrupt a spell chant/active state? |
