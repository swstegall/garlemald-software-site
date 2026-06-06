Functions to reproduce values the client derives from its own scripts.  Presented in LUA.

## Scaled experience reward from quests

```lua
function calcSkillPoint(player, lvl, weight)
    weight = weight / 100
    return math.ceil(expTable[lvl] * weight)  
    -- expTable is a table listing total XP needed per level
end
```

## Command MP cost

```lua
local commandCost = {  
    -- Some example base MP costs before the formula scales the cost to current level
    ["raise"] = 150,
    ["cure"] = 40,
    ["cura"] = 100,
    ["curaga"] = 150,
    ["firaga"] = 255,
    ["thundara"] = 135,
};

function calculateCommandCost(skillName, level)
    if skillName and level and commandCost[skillName] then
        if level <= 10 then
            return math.ceil((100 + level * 10) * (commandCost[skillName] * 0.001));
        elseif level <= 20 then
            return math.ceil((200 + (level - 10) * 20) * (commandCost[skillName] * 0.001));            
        elseif level <= 30 then
            return math.ceil((400 + (level - 20) * 40) * (commandCost[skillName] * 0.001));       
        elseif level <= 40 then
             return math.ceil((800 + (level - 30) * 70) * (commandCost[skillName] * 0.001));   
        elseif level <= 50 then
            return math.ceil((1500 + (level - 40) * 130) * (commandCost[skillName] * 0.001)); 
        elseif level <= 60 then
            return math.ceil((2800 + (level - 50) * 200) * (commandCost[skillName] * 0.001)); 
        elseif level <= 70 then
            return math.ceil((1500 + (level - 60) * 320) * (commandCost[skillName] * 0.001)); 
        else
            return math.ceil((8000 + (level - 70) * 500) * (commandCost[skillName] * 0.001)); 
        end;
  end;
  return 1;
end
```
