This is a list of all the various monster models that the FFXIV 1.23b client contains. Contents of the below are located within `<FFXIV install directory>/client/chara/mon/`. Some monster indices have multiple equippable models within, nicknamed variants, located at `/mon/<index>/equ/`.

Each variant folder within is a multiplicative of 1024 dec (0x400 hex). For example, `/equ/e008/` would be 8192 dec (0x2000 hex) if looking for actors that used that particular version of the model in the client table. Said variants are 'equipped' to the model, similar to players. So for example, top_mdl represents a body mesh which the majority of these use almost exclusively. You can change the appearance by equipping a different body slot in this instance via Set Actor Appearance (x32), or finding an actor that exists which uses the different pieces as indicated in gamedata_actor_graphic.

There's a variety of animations that can be associated to monster models, from regular weapons players can to use, to monster specific abilities used via animation category 19 (13 HEX).

| id | Mesh | Appearance | Comment |
| --- | --- | --- | --- |
| m001 | e001 | Grey standing rectangle | Collision test model? |
| m002 | e001 | Puk |  |
| m003 | e001 | Raptor |  |
| m004 | e001 | Antelope |  |
|  | e002 | Antelope Stag | Different texture from base, has horns |
| m005 | e001 | Hippocerf |  |
| m006 | e001 | Galago/Opo-Opo |  |
| m007 | e001 | Giant Gnat |  |
| m008 | e001 | Peiste |  |
|  | e002 |  | Lacks the head spikes |
| m009 | e001 | Bison/Buffalo |  |
|  | e002 |  | Different sound only, no model, probably optional for footsteps due to size difference? |
| m011 | e001 | Cactuar | Body texture variants control head piece texture on otherwise masked part of the model |
| m012 | e001 | Ochu/Morbol |  |
| m013 | e001 | Giant Crab |  |
| m017 | e001 | Miteling | No tail, no horns |
|  | e002 | Diremite | Has curled narrow spikes on tail and horns |
|  | e003 | Banemite | Rounder in design |
| m020 | e001 | Buzzard/Vulture |  |
| m021 | e001 | Salamander | Has row of wart clusters |
|  | e002 | Eft | Just one set of warts |
| m022 | e001 | Pelican | Unused in game despite being animated and nearly complete |
| m023 | e001 | Wolf | Regular wolf |
|  | e002 | Hellhound | Lives up to its name.  Only one actorClass id entry. |
|  | e003 | Watchwolf | Collar and cuffs equipped |
| m025 | e001 | Wild Hog/Boar |  |
| m028 | e001 | Bomb | Head equip gives red fiery glow |
|  | e005 |  | Head equip only, used on Bombard King, gives purple fiery glow |
| m029 | e001 | Ahriman |  |
|  | e005 |  | Head equip only.  Gives purple glow. |
| m030 | e001 | Rotting Corpse/Fallen Soldier/Zombie | Has animation data to handle Axe, Polearm, and Stave models. Investigate BTL folder some time |
|  | e005 |  | Head equip only.  Gives purple body glow. |
| m031 | e001 | Magicked Bones/Wight/Wendigo | Has animation data to handle Sword &amp; Shield models. |
|  | e005 |  | Head equip only.  Gives purple body glow. |
| m032 | e001 | Cockatrice/Dodo |  |
| m033 | e001 | Coblyn/Doblyn |  |
|  | e002 |  | Head equip is a different kind of ore |
| m034 | e001 | Biast/Drake |  |
|  | e002 |  | Bracelets added |
| m035 | e001 | Aldgoat | Textures affect horn masking |
|  | e002 |  | Larger horn model |
| m036 | e001 | Imperial Juggernaut | The tall flying Garlean mech with the chicken legs |
| m037 | e001 | Ogre |  |
|  | e002 |  | Turns the horns into antlers |
|  | e005 |  | Head equip only.  Gives purple body glow. |
| m038 | e001 | Imp |  |
|  | e005 |  | Head equip only.  Gives purple body glow. |
| m039 | e001 | Roseling/Flytrap |  |
| m040 | e001 | Treant |  |
| m041 | e001 | Apkallu |  |
| m043 | e001 | Antling |  |
| m045 | e001 | Gigantoad |  |
| m046 | e001 | Lynx/Torama/Coeurl |  |
| m047 | e001 | Chimera |  |
| m048 | e001 | Goobbue |  |
|  | e002 |  | Mount version with rug on head |
| m049 | e001 | Flan/Pudding |  |
|  | e005 |  | Head equip only.  Gives purple body glow. |
| m050 | e001 | Iron Giant | Unused in game, unfinished. Curious has a weapon animation folder 2sw_emp, implying a great sword |
| m051 | e001 | Stone Golem |  |
| m052 | e001 | Magitek Vanguard |  |
| m054 | e001 | Gargoyle |  |
|  | e005 |  | Head equip only.  Gives purple body glow. |
| m055 | e001 | Coincounter | Cyclops model. |
| m056 | e001 | Mammet |  |
| m057 | e001 | Wyvern | Unused in game, unfinished. Has some animations, test sounds. |
| m058 | e001 | Antling | Bad bookkeeping?  Dupe of m043 but no animations |
| m070 | e001 | Atomos |  |
| m091 | e001 | Lunar Fragment | Meteors during White Raven fight |
| m501 | e001 | Ladybug |  |
| m502 | e001 | Lemming | Head equip gives a repeating glow effect |
|  | e002 | Squirrel | Fluffy tail and ears over the Lemming version |
| m503 | e001 | Bat |  |
| m504 | e001 | Slug/Sea Hare |  |
| m505 | e001 | Bogy |  |
|  | e005 |  | Head equip only.  Gives purple body glow. |
| m506 | e001 | Phurble/Snurble |  |
| m507 | e001 | Angler |  |
|  | e002 | Orobon | Angler, but has ball things on its nose hairs |
| m508 | e001 | Spirit/Elemental | Smooth wings |
|  | e002 |  | Wings with defined edges |
| m509 | e001 | Swarm |  |
| m510 | e001 | Jellyfish/Aurelia |  |
|  | e002 | Anemone | Has the fat two front tendrils unlike Jellyfish |
| m511 | e001 | Yarzon |  |
| m512 | e001 | Chigoe |  |
| m513 | e001 | Mole |  |
|  | e002 | Hedgemole/Porcupine | Spikes on back compared to base model |
| m515 | e001 | Will-o-the-wisp/Plasmoid | Will-o’s fiery, plasmoids electrical |
| m516 | e001 | Eftstool/Toadstool |  |
| m518 | e001 | Ewe/Ram/Sheep/Karakul | Different body texture masks which can apply to horns/bell |
| m520 | e001 | Spriggan | Carries ore |
|  | e002 |  | Carries egg |
|  | e003 |  | Slightly different egg shape?  Hard to discern |
| m521 | e001 | Mandragora | Unused in game, unfinished. Has some animations, test sounds. |
| m524 | e001 | Infernal nail |  |
|  | e002 |  | Head equip. No discernable difference when removed?  All nail actorclass id have it equipped |
| m525 | e001 | Magitek transmitter | Shoots a beam out the top |
|  | e002 | Ceruleum generator | Has a covered top |
| m526 | e001 | Monolith | Rock towers for Howling Eye fight |
| m527 | e001 | Razor plume | For Howling Eye. Head equip is Yellow/Red glow effect.  Entries without head equipped labeld “Garuda” |
|  | e002 | Satin plume | Head equip. Green glow effect |
|  | e003 | Razor plume |  |
| m701 | e001 | Moogle |  |
|  | e002 |  | Hand equip. GLD gear.  Body equip change offers fancier whiskers for King Moggle Mog. |
|  | e003 |  | Hand equip. MRD gear |
|  | e004 |  | Hand equip. CNJ gear |
|  | e005 |  | Hand equip. ARC gear |
|  | e006 |  | Hand equip. BLM gear |
|  | e007 |  | Hand equip. BRD gear |
|  | e008 |  | Hand equip. ROG gear |
|  | e009 | King Moggle Mog | Hand equip. King gear.  Head equip looks like a series of attack graphics.  SubState stuff perhaps? |
|  | e010 |  | Head equip, unable to discern purpose, same filesize as the head file in the non-e009 folders |
| m702 | e001 | Chocobo |  |
|  | e002 |  | Chocobo with various basic barding via texture masks |
|  | e003 |  | Chocobo with goods carried on back |
|  | e004 |  | Chocobo with various Xmas goods via texture masks |
|  | e005 |  | Chocobo with Grand Company barding via three textures |
|  | e006 |  | Chocobo with armored Grand Company barding via texture masks |
|  | e900 |  | Head equip only. Assigned to all Chocobo IDs involved in Caravan escorts.  Unable to discern visual difference |
| m703 | e001 | White bird | No name. Probably intended for cutscene or scenery only.  Includes a couple take-off and landing animations |
| m704 | e001 | Blue bird | No name. Probably intended for cutscene or scenery only.  No animations |
| m707 | e001 | Chicken | Unused?  No actorclass IDs, no animations |
| m708 | e001 | Chocobo pulled ride | Cutscene model? |
| m709 | e001 | Chocobo pulled carriage | Cutscene model and/or spawned environment prop?  ARR used it for its opening scene. |
| m710 | e001 | Three chocobos | Cutscene model?  Three of them, no animations.  May have been for Ul’dah intro |
| m801 | e001 | Giant serpent | From Limsa opening.  Biggest model in the game |
| m851 | e001 | Garuda |  |
| m852 | e001 | Ifrit |  |
|  | e002 |  | Head equip. Allows death animation to work. |
| m853 | e001 | Leviathan | Unused in game.  Unfinished |
| m854 | e001 | Titan | Unused in game aside from a normally inaccessible cutscene. |
| m901 | e001 | Qiqirn |  |
|  | e002 |  | Changes in expression and texture colours.  No actor class IDs use it |
| m902 | e001 | Ixali | Head/Hands/Feet give melee style armor. Animation folders for Axe, Polearm, Staff, Sword&amp;Shield |
|  | e002 |  | Head/Hands/Feet give caster style armor |
|  | e003 |  | Head equip is a spiked helmet, only used on Lozol Totoloq the Decapitator |
| m903 | e001 | Amalj'aa | Head/Hand/Leg/Feet equip is melee style armor.  Animation folders for Bow, Polearm, Staff, Hand-to-hand |
|  | e002 |  | Head/Hand/Feet equip is caster style armor |
|  | e003 |  | Head equip is an armored tribal mask, only used on Flamefist Ahlygg Roh |
| m904 | e001 | Kobold | Animation folders for Axe, Staff, Sword&amp;Shield |
|  | e002 |  | Head equip is a large armored helmet, only used on Third Order Patriarch Zu Ga |
|  | e003 |  | Head equip are blinders over the front of the helmet, only used on 269th Order Mendicant Da Za |
| m905 | e001 | Sylph | Head equip is red gem on chest |
|  | e002 |  | Head equip is turqoise gem on chest |
|  | e003 |  | Head equip is green gem on chest |
|  | e004 |  | Head equip is yellow gem on chest |
|  | e005 |  | Head equip is purple gem on chest |
|  | e006 |  | Head equip is blue gem on chest |
| m907 | e001 | n/a | 1.0 remnant in the actorclass appearance table, folder doesn’t exist in 1.23.  Unfinished m009 (Buffalo) model |
| m909 | e001 | Ascian | Used in cutscenes only |
| m910 | e001 | Gaius van Baelsar |  |
| m911 | e001 | Imperial Centurion | Animation folders for Sword&amp;Shield |
| m912 | e001 | Goblin | Head equip is regular backpack.  No head means no backpack. |
|  | e002 |  | Head equip is metal pressurizer backpack, unused in game. |
| m917 | e001 | Nael van Darnus | Head equip is purple glow |
| m980 | e001 | Armored cabins | Various e00X parts adjust appearance and decorations for relevant equip slots.  Doesn’t look like the game makes much use of it all. |
|  | e002 |  |  |
|  | e003 |  |  |
|  | e035 |  |  |
|  | e036 |  |  |
| m998 | e001 | Dummy? | Barebones folder with no visible mesh, perhaps reserved for a future model intended to take this spot. |
| m999 | e001 | AoE effects | Catch-all model for select encounter’s effects.  Each e00X has its own set of textures, but unknown usage. |
|  | e002 |  |  |
|  | e003 |  |  |
