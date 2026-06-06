This is a list of all the various objects that the FFXIV 1.23b client contains. Contents of the below are located within `<FFXIV install directory>/client/chara/bgobj/` . Some bgobj indices have multiple models within, nicknamed variants, located at `/bgobj/<index>/equ/`.

Each variant folder within is a multiplicative of 1024 dec (0x400 hex). For example, `/equ/e008/` would be 8192 dec (0x2000 hex) if looking for actors that used that particular version of the model in the client table. Said variants are 'equipped' to the model, similar to players. So for example, top_mdl represents a body mesh which the majority of these use almost exclusively. You can change the appearance by equipping a different body slot in this instance via Set Actor Appearance (x32), or finding an actor that exists which uses the different pieces as indicated in gamedata_actor_graphic

All animations relating to bgobjs use the lib category (04 HEX) exclusively.

| Index 20XXX | Variant | Model | Model Comment | Animations | subStat |
| --- | --- | --- | --- | --- | --- |
| b001 | e001 | Rope |   |   |   |
| b002 | e001 | Large boat | Similar to the one used in Limsa intro |   |   |
| b003 | e001 | Large boats |   |   |   |
|   | e002 |   |   |   |   |
| b004 | e001 | Boat door |   |   |   |
| b900 | e001 | Two coloured cubes |   |   |   |
| b901 | e001 | Variety | New Years/Christmas/Summer furnishings, mugs/plates/books, and Rivenroad objects |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
|   | e005 |   |   |   |   |
|   | e006 |   |   |   |   |
|   | e007 |   |   |   |   |
|   | e008 |   |   |   |   |
|   | e009 |   |   |   |   |
|   | e010 |   |   |   |   |
|   | e011 |   |   |   |   |
|   | e012 |   |   |   |   |
|   | e013 |   |   |   |   |
|   | e015 |   |   |   |   |
|   | e016 |   |   |   |   |
|   | e017 |   |   |   |   |
|   | e018 |   |   |   |   |
|   | e019 |   |   |   |   |
|   | e020 |   |   |   |   |
|   | e022 |   |   |   |   |
|   | e023 |   |   |   |   |
|   | e024 |   |   |   |   |
|   | e025 |   |   |   |   |
|   | e026 |   |   |   |   |
|   | e030 |   |   |   |   |
|   | e031 |   |   |   |   |
| b902 | e001 | Aetheryte crystal | Has both blue crystal and red version |   |   |
|   | e002 |   |   |   |   |
| b903 | e001 | Mini-Aetheryte crystal | Used in the city near Grand Company NPCs |   |   |
| b904 | e001 | Primal Aetheryte | Used for re-entry into a Primal instance if it’s full when it tries to teleport you in |   |   |
| b906 | e001 | Basket of green peas? |   |   |   |
| b907 | e001 | Square Wooden crate |   |   |   |
| b908 | e001 | Square Wooden crate | Seems identical to b907 |   |   |
| b909 | e001 | Aluminum bucket | Each variant contains something different (or nothing) |   |   |
|   | e004 |   |   |   |   |
|   | e005 |   |   |   |   |
|   | e006 |   |   |   |   |
| b910 | e001 | Garlean ship | Low-rez textures, likely the ones used for flying overhead the regions |   |   |
| b911 | e001 | Boat with Sahagin marks |   | 151 - Auto-loaded?  Probably the swaying boards on the side and mast waver |   |
| b912 | e001 | Boats | One has Fishermans Guild logo on it, the other Limsa Lominsa | Animations do nothing? |   |
|   | e002 |   |   |   |   |
| b913 | e001 | Big boat | Has a faction flag on one?  Other not visible in model viewer, check ingame sometime |   |   |
|   | e002 |   |   |   |   |
| b914 | e001 | Boats | Has a faction flag on one?  Others not visible in model viewer, check ingame sometime |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
|   | e005 |   |   |   |   |
|   | e006 |   |   |   |   |
| b915 | e001 | Boat with red masts | Used in a Limsa cutscene |   |   |
| b916 | e001 | Dinghy | One has mast set and a side canoe, other doesn’t |   |   |
|   | e002 |   |   |   |   |
| b917 | e001 | Boat with red masts | Same as b915? |   |   |
| b918 | e001 | Lily light furnishing | Looks like something Conjurer’s Guild would have. | 101 – Bell rings and glows for a moment |   |
| b919 | e001 | Urns | From Ixali? | 001 – Lid opens, then urn disappears shortly after.  101 – Lid opens and remains open.  201 – Lid opens, then closes shortly after |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
| b920 | e001 | Urns | From Kobold? | 001 – Lid opens, then urn disappears shortly after.  101 – Lid opens and remains open.  201 – Lid opens, then closes shortly after |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
| b921 | e001 | Kobold drill w/ cart |   | 151 – Removes coal from cart |   |
| b922 | e001 | Gong | From Amaljaa? | 101 – Arm on gong pulls back, then swings against gong |   |
| b923 | e001 | Chests | Levequests use these iirc. | 001 – Lid opens, then chest disappears shortly after.  101 – Lid opens and remains open.  201 – Lid opens, then closes shortly after |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
| b924 | e001 | Festival Float | Used in Ul’dah intro cinematic |   |   |
| b925 | e001 | Aetherial gate? | Looks like the thing that spawns when you clear a guildleve |   |   |
| b926 | e001 | Kobold drill | Same as b921 but without a cart attached to it |   |   |
| b927 | e001 | Amal’jaa Chests | Used in Amal’jaa raids, probably Ifrit reward as well, verify | 001 – Lid opens, then chest disappears shortly after.  101 – Lid opens and remains open.  201 – Lid opens, then closes shortly after |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
| b928 | e001 | Bells | Seasonal event-only furnishing? | Same animation of rope being pulled and bells ringing.  Animation value dictates the sound of the bell, likely to correspond with each variant |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
| b929 | e001 | Little Ladies’ deployed wall | Little Ladies’ Day Event furnishing |   |   |
| b930 | e001 | Cherry blossom trees | Little Ladies’ Day Event furnishing? | Animation only turns off extra decor of the one variant?   |   |
|   | e002 |   |   |   |   |
| b931 | e001 | Cherry blossom trees | Little Ladies’ Day Event furnishing? Different tree size than b930 | Animation only turns off extra decor of the one variant?   |   |
|   | e002 |   |   |   |   |
| b932 | e001 | Cherry blossom archway | Little Ladies’ Day Event furnishing? | Animation only turns off extra decor of the one variant?   |   |
|   | e002 |   |   |   |   |
| b933 | e001 | Christmas Tree | Xmas event |   |   |
| b934 | e001 | Christmas Tree | Xmas event.  Looks identical to b933? |   |   |
| b935 | e001 | Christmas Archway |   |   |   |
| b936 | e001 | Magitek Terminal | Little dungeon barriers in instanced content. | 3-9 do a fizzle effect.  13-19 Turn off the light?  93-99 do same as 13-19? |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
|   | e005 |   |   |   |   |
|   | e006 |   |   |   |   |
|   | e007 |   |   |   |   |
|   | e008 |   |   |   |   |
|   | e009 |   |   |   |   |
| b937 | e001 | Coffin |   |   |   |
| b938 | e001 | Ironworks Airship |   |   |   |
| b939 | e001 | Fireworks launcher | Moonfire Faire. Presumably uses the fireworks animations under vfx/lib |   |   |
|   | e002 |   |   |   |   |
| b940 | e001 | Halloween Tomb | Halloween prop. |   |   |
| b941 | e001 | Broken bricks | Looks like pieces of something from Ul’dah |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
| b942 | e001 | Moonfire Faire fireplace | Moonfire Fair prop. | 001 – Fire lights up blue for a moment |   |
| b943 | e001 | Titan’s Heart | Used in Titan’s cutscene, unsure if anywhere else. |   |   |
| b949 | e001 | Chocobo Sign |   |   |   |
| b950 | e001 | Carriage Sign |   |   |   |
| b951 | e001 | Rectangular Wooden Crate |   |   |   |
| b952 | e001 | Brazier |   |   |   |
| b953 | e001 | Broken stand thing | Used in Ul’dah intro cinematic? |   |   |
| b954 | e001 | Yellow eggs |   |   |   |
| b955 | e001 | Rocks | Looks like it’d fit in Thanalan |   |   |
| b957 | e001 | Rock with flora | Looks like it’d fit in Black Shroud |   |   |
| b958 | e001 | Retainer bell | Retainer bell | 101 – Bell rings |   |
| b959 | e001 | Airship |   |   |   |
| b960 | e001 | Kobold portable furnace |   |   |   |
| b961 | e001 | Kobold carriage |   |   |   |
| b962 | e001 | Amal’jaa carriage | Two general versions of the carriage, one with armored windows, weapons and a smoke stack, the other with the Amal’jaa logo on it and spikes on top | 151 – Changes visual state depending of variant.  152 – Changes visual state depending on variant  |   |
|   | e002 |   |   |   |   |
| b963 | e001 | Armored Amal’jaa carriage |   |   |   |
| b964 | e001 | Ixali balloon platform |   | 151 – Turns off Ixali logo.  152 – Turns off held wooden logs |   |
|   | e002 |   |   |   |   |
| b965 | e001 | Sylph egg | Presumably used in Black Shroud for a quest or cutscene. |   |   |
| b966 | e001 | Gathering point | Figure out which kind of gathering point this is |   |   |
|   | e002 |   |   |   |   |
| b967 | e001 | Gathering point | Figure out which kind of gathering point this is |   |   |
| b968 | e001 | Gathering point | Figure out which kind of gathering point this is |   |   |
| b969 | e001 | Swirly animation | Fishing point? |   |   |
| b970 | e001 | Faint light | Fishing point? |   |   |
| b971 | e001 | Fish animation | Invisible model outside of animations | 101 – Water ripple.  102 – Fish hops out of water and back into it |   |
| b972 | e001 | Easter balloon w/ egg basket |   |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
| b973 | e001 | Easter eggs |   |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
| b974 | e001 | Firefly? | Yellow/brownish light that wavers about. Used as the Photocell Model for raidDungeonLight |   |   |
| b975 | e001 | Moonfire Fair Bomb decor |   |   |   |
| b976 | e001 | Halloween Basket |   |   |   |
| b978 | e001 | Christmas Ornament | New Years variant as well? |   |   |
|   | e002 |   |   |   |   |
| b979 | e001 | Snowman | From small snowman to ever larger, part of a quest series. |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
|   | e005 |   |   |   |   |
| b980 | e001 | Christmas Bell |   |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
| b981 | e001 | Valentine’s Archway | Variants look identical? |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
| b982 | e001 | Valentine’s Brazier | Variants look identical? |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
|   | e005 |   |   |   |   |
|   | e006 |   |   |   |   |
|   | e007 |   |   |   |   |
|   | e008 |   |   |   |   |
|   | e009 |   |   |   |   |
| b983 | e001 | Tall wooden crate |   | 001 – Sparkle effect plays out |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
|   | e005 |   |   |   |   |
|   | e006 |   |   |   |   |
|   | e007 |   |   |   |   |
|   | e008 |   |   |   |   |
| b984 | e001 | Easter Egg Shrines |   |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
|   | e005 |   |   |   |   |
|   | e006 |   |   |   |   |
|   | e007 |   |   |   |   |
|   | e008 |   |   |   |   |
|   | e009 |   |   |   |   |
|   | e010 |   |   |   |   |
|   | e011 |   |   |   |   |
|   | e012 |   |   |   |   |
|   | e013 |   |   |   |   |
|   | e014 |   |   |   |   |
|   | e015 |   |   |   |   |
| b985 | e001 | Kobold coal cart | Coal cart | 151 – Removes the coal |   |
| b986 | e001 | Invisible model | Used as an interaction point for locked doors |   |   |
| b987 | e001 | Resource carts | Two with weapons, one with food, one with potions.  Used in Behest perhaps? |   |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
| b988 | e001 | Magic Barrier | Three variants of a round barrier looking effect | 201 – Causes a fizzle effect within the barrier |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
| b989 | e001 | Misc Props | Square wooden crate, covered urn, wooden barrel, metal milk jug.  All with a glowy light above | 001 – Causes glowy light to fade and return.  Perhaps there’s a state where this is off on the model? |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
| b990 | e001 | Invisible model | Used for various targetable interaction points, like Beds and ???s |   |   |
| b991 | e001 | Invisible model | Used for various targetable interaction points, like Armoires and ???s |   |   |
| b992 | e001 | Moonfire Faire Bombs x4 |   |   |   |
| b993 | e001 | Rock |   |   |   |
| b996 | e001 | Sand swirl | One variant is smaller and less aggressivley animated than the other. Triggerable animations probably correspond to their variant.  Used in Cutter’s Cry presumably | 001 – Small sand swirl above ground. 002 – Bigger sand swirl above ground |   |
|   | e002 |   |   |   |   |
| b997 | e001 | Misc Interaction Points | Variants used for Unending Journey, Guildleves, a variety of ???s, etc.  Models include a blank, a sparkly dot, a moogle sounding thing, a pillar of light, a small purple light | 201 – Causes pillar to fizzle out. 301 – Also causes pillar to fizzle out. 401 – Plays a little ring sound, also fizzles certain variants? |   |
|   | e002 |   |   |   |   |
|   | e003 |   |   |   |   |
|   | e004 |   |   |   |   |
|   | e005 |   |   |   |   |
| b998 | e001 | Misc Interaction Points | Variants include a pulsing blue ground effect, an aetherial node, another aetherial thingy, a more reddishpurple aetherial thingy, a blank, a fire (CS-only?), blue sparkles with a hum, red sparkles with a hum | 100 – Fades model out/turns off sound. 101 – Turns on red pulsing ground effect |   |
|   | e003 |   |   |   |   |
|   | e005 |   |   |   |   |
|   | e006 |   |   |   |   |
|   | e007 |   |   |   |   |
|   | e008 |   |   |   |   |
|   | e010 |   |   |   |   |
|   | e011 |   |   |   |   |
|   | e012 |   |   |   |   |
|   | e018 |   |   |   |   |
