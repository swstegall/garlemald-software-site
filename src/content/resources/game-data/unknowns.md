An unorganized list of long-standing unknowns with the client.

### Magitek Terminals

| Description | In instanced dungeons, these have a circular aura effect around them to signal where players need to stand for a period of time to activate it. |
| --- | --- |
| Problem | Figuring out the trigger for this effect is unknown. |
| Notes | BgObj model b936.  Textures for the effect appear packed along with each variation of the model.  Calling LIB animations does nothing for it other than the 'pulse' effect in the 3-9 range. |

### Linkshell/Company strings

| Description | There are GameMessages involving the name of a Linkshell or Company in its dialog. |
| --- | --- |
| Problem | Sending an Invite or equipping an LS displays a "." in text. |
| Notes | WorldMaster ids like 25131, 25150, and 25151 exhibit the issue.  In the sheets the LS/Company are called under [@STRING($EA(2))] or [@STRING($EB(49))].<br /> $EA operator - We do not know what its function is or how to set values in the client for it to use.<br /> $EB operator - calling values that far (eg. 15+) is unknown how to set since it's out of the luaParam range for SendGameMessage |

### Nameplate hidden when player is unable to move

| Description | During zone transitions into quest-related triggers on retail, the player nameplate is hidden until they're allowed to move again. |
| --- | --- |
| Problem | This isn't replicated at present. |
| Notes | Need to research for accuracy reasons. |
