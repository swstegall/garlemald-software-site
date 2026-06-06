This is a list of all the various opcodes that FFXIV 1.23b uses. Empty names are unknown packets. Packets labeled `DEPRECATED` mean the code they responded to was probably macroed out in the retail build, and the client doesn't do anything when one is sent.

## Lobby Channel

<table>
  <tr>
    <th colspan="6">Server -> Client</th>
  </tr>
  <tr>
    <th>Opcode</th>
    <th>Packet Name</th>
  </tr>
  <tr>
    <td>0x001</td>
    <td></td>
  </tr>
  <tr>
    <td>0x002</td>
    <td>Error</td>
  </tr>
  <tr>
    <td>0x00C</td>
    <td>Account List</td>
  </tr>
  <tr>
    <td>0x00D</td>
    <td>Character List</td>
  </tr>
  <tr>
    <td>0x00E</td>
    <td>Modify Character Reply</td>
  </tr>
  <tr>
    <td>0x00F</td>
    <td>Select Character Reply</td>
  </tr>
  <tr>
    <td>0x010</td>
    <td>Modify Retainers Reply</td>
  </tr>
  <tr>
    <td>0x015</td>
    <td>World List</td>
  </tr>
  <tr>
    <td>0x016</td>
    <td>Import Name List</td>
  </tr>
  <tr>
    <td>0x017</td>
    <td>Retainer List</td>
  </tr>
  <tr>
    <td>0x1F5</td>
    <td></td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6">Client -> Server</th>
  </tr>
  <tr>
    <th>Opcode</th>
    <th>Packet Name</th>
  </tr>
  <tr>
    <td>0x003</td>
    <td>Get Characters</td>
  </tr>
  <tr>
    <td>0x004</td>
    <td>Select Character</td>
  </tr>
  <tr>
    <td>0x005</td>
    <td>Get Accounts</td>
  </tr>
  <tr>
    <td>0x006</td>
    <td></td>
  </tr>
  <tr>
    <td>0x00B</td>
    <td>Modify Character</td>
  </tr>
  <tr>
    <td>0x00F</td>
    <td>Finish Mod Retainers</td>
  </tr>
  <tr>
    <td>0x1F5</td>
    <td>LobbyLoginOperation related....</td>
  </tr>
  <tr>
    <td>0x1F6</td>
    <td>LobbyLoginOperation related....</td>
  </tr>
</table>

## Chat Channel

<table>
  <tr>
    <th colspan="6">Server -> Client</th>
  </tr>
  <tr>
    <th>Opcode</th>
    <th>Packet Name</th>
  </tr>
  <tr>
    <td>0x0C8</td>
    <td>Tell Message</td>
  </tr>
  <tr>
    <td>0x0C9</td>
    <td>Group Message</td>
  </tr>
  <tr>
    <td>0x0CA</td>
    <td>Tell Message Error</td>
  </tr>
  <tr>
    <td>0x0CB</td>
    <td>Generic Log Message</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6">Client -> Server</th>
  </tr>
  <tr>
    <th>Opcode</th>
    <th>Packet Name</th>
  </tr>
  <tr>
    <td>0x0C8</td>
    <td>Tell Message</td>
  </tr>
  <tr>
    <td>0x0C9</td>
    <td>Group Message</td>
  </tr>
</table>

## Zone Channel

<table>
  <tr>
    <th colspan="6">Server -> Client</th>
  </tr>
  <tr>
    <th>Opcode</th>
    <th>Packet Name</th>
  </tr>
  <tr>
    <td>0x001</td>
    <td>Pong</td>
  </tr>
  <tr>
    <td>0x002</td>
    <td>Unknown 0x002</td>
  </tr>
  <tr>
    <td>0x003</td>
    <td>Say Message</td>
  </tr>
  <tr>
    <td>0x004</td>
    <td>Reset Engine</td>
  </tr>
  <tr>
    <td>0x005</td>
    <td>Set Map</td>
  </tr>
  <tr>
    <td>0x006</td>
    <td>Mass Delete Actor Start</td>
  </tr>
  <tr>
    <td>0x007</td>
    <td>Mass Delete Actor End</td>
  </tr>
  <tr>
    <td>0x008</td>
    <td>Mass Delete Actor Body (x1)</td>
  </tr>
  <tr>
    <td>0x009</td>
    <td>Mass Delete Actor Body (x10)</td>
  </tr>
  <tr>
    <td>0x00A</td>
    <td>Mass Delete Actor Body (x20)</td>
  </tr>
  <tr>
    <td>0x00B</td>
    <td>Mass Delete Actor Body (x40)</td>
  </tr>
  <tr>
    <td>0x00C</td>
    <td>Set Music</td>
  </tr>
  <tr>
    <td>0x00D</td>
    <td>Set Weather</td>
  </tr>
  <tr>
    <td>0x00E</td>
    <td>Logout</td>
  </tr>
  <tr>
    <td>0x00F</td>
    <td></td>
  </tr>
  <tr>
    <td>0x010</td>
    <td>Set Dalamud Phase</td>
  </tr>
  <tr>
    <td>0x011</td>
    <td>Quit Game</td>
  </tr>
  <tr>
    <td>0x0CA</td>
    <td>Create Actor</td>
  </tr>
  <tr>
    <td>0x0CB</td>
    <td>Remove Actor</td>
  </tr>
  <tr>
    <td>0x0CC</td>
    <td>Load Class Script for Actor</td>
  </tr>
  <tr>
    <td>0x0CD</td>
    <td>Unload Class Script</td>
  </tr>
  <tr>
    <td>0x0CE</td>
    <td>Set Actor Position</td>
  </tr>
  <tr>
    <td>0x0CF</td>
    <td>Move Actor to Position</td>
  </tr>
  <tr>
    <td>0x0D0</td>
    <td>Set Actor Speeds</td>
  </tr>
  <tr>
    <td>0x0D2</td>
    <td>DEPRECATED</td>
  </tr>
  <tr>
    <td>0x0D3</td>
    <td>Set Actor Target (Animated)</td>
  </tr>
  <tr>
    <td>0x0D4</td>
    <td>Turn Actor to Target</td>
  </tr>
  <tr>
    <td>0x0D6</td>
    <td>Set Actor Appearance (x32)</td>
  </tr>
  <tr>
    <td>0x0D7</td>
    <td>Set Actor Appearance (x16)</td>
  </tr>
  <tr>
    <td>0x0D8</td>
    <td>Bind BG MapObj to Actor</td>
  </tr>
  <tr>
    <td>0x0D9</td>
    <td>Play BG animation</td>
  </tr>
  <tr>
    <td>0x0DA</td>
    <td>Play particle animation on actor (w.o stopping)</td>
  </tr>
  <tr>
    <td>0x0DB</td>
    <td>Set Head to Actor (/w speed)</td>
  </tr>
  <tr>
    <td>0x0DC</td>
    <td>Set Head to Position (/w speed)</td>
  </tr>
  <tr>
    <td>0x0DD</td>
    <td>Set Actor Head Orientation (/w speed)</td>
  </tr>
  <tr>
    <td>0x0DE</td>
    <td>Reset Head</td>
  </tr>
  <tr>
    <td>0x0DF</td>
    <td>Set Actor Target (Immediate)</td>
  </tr>
  <tr>
    <td>0x0E0</td>
    <td>Play Animation/Effect</td>
  </tr>
  <tr>
    <td>0x0E1</td>
    <td>Do Emote</td>
  </tr>
  <tr>
    <td>0x0E2</td>
    <td>Map Change & UI Change</td>
  </tr>
  <tr>
    <td>0x0E3</td>
    <td>Set Actor Quest Icon</td>
  </tr>
  <tr>
    <td>0x0E4</td>
    <td>Show/Hide Weapon</td>
  </tr>
  <tr>
    <td>0x0E5</td>
    <td>Show Countdown</td>
  </tr>
  <tr>
    <td>0x12C</td>
    <td>DEPRECATED</td>
  </tr>
  <tr>
    <td>0x12E</td>
    <td>SetTalkEventCondition</td>
  </tr>
  <tr>
    <td>0x12F</td>
    <td>KickClientOrderEvent</td>
  </tr>
  <tr>
    <td>0x130</td>
    <td>StartServerOrderEventFunction</td>
  </tr>
  <tr>
    <td>0x131</td>
    <td>EndClientOrderEvent</td>
  </tr>
  <tr>
    <td>0x132</td>
    <td>DEPRECATED</td>
  </tr>
  <tr>
    <td>0x133</td>
    <td>General Data Packet</td>
  </tr>
  <tr>
    <td>0x134</td>
    <td>Set Actor MainState</td>
  </tr>
  <tr>
    <td>0x136</td>
    <td>SetEventStatus</td>
  </tr>
  <tr>
    <td>0x137</td>
    <td>Set Actor Work Values (SyncMemory)</td>
  </tr>
  <tr>
    <td>0x138</td>
    <td>SetTargetTime</td>
  </tr>
  <tr>
    <td>0x139</td>
    <td>Command Result (x01 Log/Effect)</td>
  </tr>
  <tr>
    <td>0x13A</td>
    <td>Command Result (x10 Log/Effect)</td>
  </tr>
  <tr>
    <td>0x13B</td>
    <td>Command Result (x18 Log/Effect)</td>
  </tr>
  <tr>
    <td>0x13C</td>
    <td>Command Result (No Log/Effect)</td>
  </tr>
  <tr>
    <td>0x13D</td>
    <td>Set Actor Name</td>
  </tr>
  <tr>
    <td>0x143</td>
    <td>Delete Group</td>
  </tr>
  <tr>
    <td>0x144</td>
    <td>Set Actor SubState</td>
  </tr>
  <tr>
    <td>0x145</td>
    <td>Set Actor Icon (ChangeActorExtraStat)</td>
  </tr>
  <tr>
    <td>0x146</td>
    <td>ItemPackage Chunk Start</td>
  </tr>
  <tr>
    <td>0x147</td>
    <td>ItemPackage Chunk End</td>
  </tr>
  <tr>
    <td>0x148</td>
    <td>Add Item (x01)</td>
  </tr>
  <tr>
    <td>0x149</td>
    <td>Add Item (x08, variable)</td>
  </tr>
  <tr>
    <td>0x14A</td>
    <td>Add Item (x16)</td>
  </tr>
  <tr>
    <td>0x14B</td>
    <td>Add Item (x32)</td>
  </tr>
  <tr>
    <td>0x14C</td>
    <td>Add Item (x64)</td>
  </tr>
  <tr>
    <td>0x14D</td>
    <td>Set Equipment Id (x01)</td>
  </tr>
  <tr>
    <td>0x14E</td>
    <td>Set Equipment Id (x08, variable)</td>
  </tr>
  <tr>
    <td>0x14F</td>
    <td>Set Equipment Id (x16)</td>
  </tr>
  <tr>
    <td>0x150</td>
    <td>Set Equipment Id (x32)</td>
  </tr>
  <tr>
    <td>0x151</td>
    <td>Set Equipment Id (x64)</td>
  </tr>
  <tr>
    <td>0x152</td>
    <td>Remove Item (x01)</td>
  </tr>
  <tr>
    <td>0x153</td>
    <td>Remove Item (x08, variable)</td>
  </tr>
  <tr>
    <td>0x154</td>
    <td>Remove Item (x16)</td>
  </tr>
  <tr>
    <td>0x155</td>
    <td>Remove Item (x32)</td>
  </tr>
  <tr>
    <td>0x156</td>
    <td>Remove Item (x64)</td>
  </tr>
  <tr>
    <td>0x157</td>
    <td>Text Sheet Message (Source Actor) (30b)</td>
  </tr>
  <tr>
    <td>0x158</td>
    <td>Text Sheet Message (Source Actor) (38b)</td>
  </tr>
  <tr>
    <td>0x159</td>
    <td>Text Sheet Message (Source Actor) (40b)</td>
  </tr>
  <tr>
    <td>0x15A</td>
    <td>Text Sheet Message (Source Actor) (50b)</td>
  </tr>
  <tr>
    <td>0x15B</td>
    <td>Text Sheet Message (Source Actor) (70b)</td>
  </tr>
  <tr>
    <td>0x15C</td>
    <td>Text Sheet Message (Custom Sender) (48b)</td>
  </tr>
  <tr>
    <td>0x15D</td>
    <td>Text Sheet Message (Custom Sender) (58b)</td>
  </tr>
  <tr>
    <td>0x15E</td>
    <td>Text Sheet Message (Custom Sender) (68b)</td>
  </tr>
  <tr>
    <td>0x15F</td>
    <td>Text Sheet Message (Custom Sender) (78b)</td>
  </tr>
  <tr>
    <td>0x160</td>
    <td>Text Sheet Message (Custom Sender) (98b)</td>
  </tr>
  <tr>
    <td>0x161</td>
    <td>Text Sheet Message (DispId Sender) (30b)</td>
  </tr>
  <tr>
    <td>0x162</td>
    <td>Text Sheet Message (DispId Sender) (38b)</td>
  </tr>
  <tr>
    <td>0x163</td>
    <td>Text Sheet Message (DispId Sender) (40b)</td>
  </tr>
  <tr>
    <td>0x164</td>
    <td>Text Sheet Message (DispId Sender) (50b)</td>
  </tr>
  <tr>
    <td>0x165</td>
    <td>Text Sheet Message (DispId Sender) (60b)</td>
  </tr>
  <tr>
    <td>0x166</td>
    <td>Text Sheet Message (No Source Actor) (28b)</td>
  </tr>
  <tr>
    <td>0x167</td>
    <td>Text Sheet Message (No Source Actor) (38b)</td>
  </tr>
  <tr>
    <td>0x168</td>
    <td>Text Sheet Message (No Source Actor) (38b)</td>
  </tr>
  <tr>
    <td>0x169</td>
    <td>Text Sheet Message (No Source Actor) (48b)</td>
  </tr>
  <tr>
    <td>0x16A</td>
    <td>Text Sheet Message (No Source Actor) (68b)</td>
  </tr>
  <tr>
    <td>0x16B</td>
    <td>SetNoticeEventCondition</td>
  </tr>
  <tr>
    <td>0x16C</td>
    <td>SetEmoteEventCondition</td>
  </tr>
  <tr>
    <td>0x16D</td>
    <td>Inventory Begin Change</td>
  </tr>
  <tr>
    <td>0x16E</td>
    <td>Inventory End Change</td>
  </tr>
  <tr>
    <td>0x16F</td>
    <td>SetPushEventConditionWithCircle</td>
  </tr>
  <tr>
    <td>0x170</td>
    <td>SetPushEventConditionWithFan</td>
  </tr>
  <tr>
    <td>0x171</td>
    <td>DEPRECATED</td>
  </tr>
  <tr>
    <td>0x172</td>
    <td>DEPRECATED</td>
  </tr>
  <tr>
    <td>0x173</td>
    <td>DEPRECATED</td>
  </tr>
  <tr>
    <td>0x174</td>
    <td>DEPRECATED</td>
  </tr>
  <tr>
    <td>0x175</td>
    <td>SetPushEventConditionWithTriggerBox</td>
  </tr>
  <tr>
    <td>0x176</td>
    <td>Set Item Modifier (x1)</td>
  </tr>
  <tr>
    <td>0x177</td>
    <td>Set Status @ Index</td>
  </tr>
  <tr>
    <td>0x179</td>
    <td>Set All Status</td>
  </tr>
  <tr>
    <td>0x17A</td>
    <td>Set Group Work Values</td>
  </tr>
  <tr>
    <td>0x17B</td>
    <td>Set Actor In Different Zone (ChangeShadowActorFlag)</td>
  </tr>
  <tr>
    <td>0x17C</td>
    <td>Group Packet Header</td>
  </tr>
  <tr>
    <td>0x17D</td>
    <td>Group Begin</td>
  </tr>
  <tr>
    <td>0x17E</td>
    <td>Group End</td>
  </tr>
  <tr>
    <td>0x17F</td>
    <td>Group Members Body (x8, variable)</td>
  </tr>
  <tr>
    <td>0x180</td>
    <td>Group Members Body (x16)</td>
  </tr>
  <tr>
    <td>0x181</td>
    <td>Group Members Body (x32)</td>
  </tr>
  <tr>
    <td>0x182</td>
    <td>Group Members Body (x64)</td>
  </tr>
  <tr>
    <td>0x183</td>
    <td>Group Duty Members Body (x8, variable)</td>
  </tr>
  <tr>
    <td>0x184</td>
    <td>Group Duty Members Body (x16)</td>
  </tr>
  <tr>
    <td>0x185</td>
    <td>Group Duty Members Body (x32)</td>
  </tr>
  <tr>
    <td>0x186</td>
    <td>Group Duty Members Body (x64)</td>
  </tr>
  <tr>
    <td>0x187</td>
    <td>Set Occupancy Group (DOUBLE CHECK!)</td>
  </tr>
  <tr>
    <td>0x188</td>
    <td>Create Named Group (IE: LS)</td>
  </tr>
  <tr>
    <td>0x189</td>
    <td>Create Named Group (x8, variable)</td>
  </tr>
  <tr>
    <td>0x18A</td>
    <td>Set Active Linkshell</td>
  </tr>
  <tr>
    <td>0x18B</td>
    <td>Set Group LayoutID</td>
  </tr>
  <tr>
    <td>0x18C</td>
    <td></td>
  </tr>
  <tr>
    <td>0x18D</td>
    <td>Party Map Marker Update (x16, variable)</td>
  </tr>
  <tr>
    <td>0x18E</td>
    <td>Set Retainer Star (ChangeSystemStat)</td>
  </tr>
  <tr>
    <td>0x18F</td>
    <td>Mass Set Item Modifier Begin</td>
  </tr>
  <tr>
    <td>0x190</td>
    <td>Mass Set Item Modifier</td>
  </tr>
  <tr>
    <td>0x191</td>
    <td>Mass Set Item Modifier End</td>
  </tr>
  <tr>
    <td>0x192</td>
    <td>Send Addiction Limit Message</td>
  </tr>
  <tr>
    <td>0x193</td>
    <td>Stops control (0x14) and starts (0x15).</td>
  </tr>
  <tr>
    <td>0x194</td>
    <td>Set Grand Company Info</td>
  </tr>
  <tr>
    <td>0x195</td>
    <td>Set Emnity Indicator</td>
  </tr>
  <tr>
    <td>0x196</td>
    <td>Set SpecialEventWork</td>
  </tr>
  <tr>
    <td>0x197</td>
    <td>Set Chocobo Ride</td>
  </tr>
  <tr>
    <td>0x198</td>
    <td>Set Chocobo Name</td>
  </tr>
  <tr>
    <td>0x199</td>
    <td>Set Has Chocobo</td>
  </tr>
  <tr>
    <td>0x19A</td>
    <td>Set Achievements Completed</td>
  </tr>
  <tr>
    <td>0x19B</td>
    <td>Set Latest Achievements</td>
  </tr>
  <tr>
    <td>0x19C</td>
    <td>Set Total Achievement Points</td>
  </tr>
  <tr>
    <td>0x19D</td>
    <td>Set Player Title</td>
  </tr>
  <tr>
    <td>0x19E</td>
    <td>Achievement Earned Packet</td>
  </tr>
  <tr>
    <td>0x19F</td>
    <td>Respond Achievement Completion Rate</td>
  </tr>
  <tr>
    <td>0x1A0</td>
    <td>Set Gobbue Appearance</td>
  </tr>
  <tr>
    <td>0x1A1</td>
    <td>Set Has Gobbue Mount</td>
  </tr>
  <tr>
    <td>0x1A2</td>
    <td>JobQuestCompleteTriple</td>
  </tr>
  <tr>
    <td>0x1A3</td>
    <td>Set Cutscene Book Details</td>
  </tr>
  <tr>
    <td>0x1A4</td>
    <td>Set Current Job</td>
  </tr>
  <tr>
    <td>0x1A5</td>
    <td>EntrustItem</td>
  </tr>
  <tr>
    <td>0x1A6</td>
    <td>HamletSupplyRanking</td>
  </tr>
  <tr>
    <td>0x1A7</td>
    <td>Set Dream Result (Required for wakeup)</td>
  </tr>
  <tr>
    <td>0x1A8</td>
    <td>HamletDefenseScore</td>
  </tr>
  <tr>
    <td>0x1C2</td>
    <td>DEPRECATED</td>
  </tr>
  <tr>
    <td>0x1C3</td>
    <td>Recruiting Started Response</td>
  </tr>
  <tr>
    <td>0x1C4</td>
    <td>Recruiting Ended Response</td>
  </tr>
  <tr>
    <td>0x1C5</td>
    <td>Recruiting State Response (Open Party)</td>
  </tr>
  <tr>
    <td>0x1C6</td>
    <td>Recruiting Acceptment Response</td>
  </tr>
  <tr>
    <td>0x1C7</td>
    <td>Recruitment Search Results</td>
  </tr>
  <tr>
    <td>0x1C8</td>
    <td>Get Recruitment Info</td>
  </tr>
  <tr>
    <td>0x1C9</td>
    <td>Add Blacklist Response</td>
  </tr>
  <tr>
    <td>0x1CA</td>
    <td>Remove Blacklist Response</td>
  </tr>
  <tr>
    <td>0x1CB</td>
    <td>Send Blacklist</td>
  </tr>
  <tr>
    <td>0x1CC</td>
    <td>Add Friendlist Response</td>
  </tr>
  <tr>
    <td>0x1CD</td>
    <td>Remove Friendlist Response</td>
  </tr>
  <tr>
    <td>0x1CE</td>
    <td>Send Friendlist</td>
  </tr>
  <tr>
    <td>0x1CF</td>
    <td>Friend Status Update Response</td>
  </tr>
  <tr>
    <td>0x1D0</td>
    <td>Faq Request Response</td>
  </tr>
  <tr>
    <td>0x1D1</td>
    <td>Faq Body Response</td>
  </tr>
  <tr>
    <td>0x1D2</td>
    <td>Send Issue Options</td>
  </tr>
  <tr>
    <td>0x1D3</td>
    <td>Makes GM Icon Reply appear</td>
  </tr>
  <tr>
    <td>0x1D4</td>
    <td>GM Message Response</td>
  </tr>
  <tr>
    <td>0x1D5</td>
    <td>GM Ticket Sent Response</td>
  </tr>
  <tr>
    <td>0x1D6</td>
    <td>Confirm GM ticket ended</td>
  </tr>
  <tr>
    <td>0x1D7</td>
    <td>Item Search Start</td>
  </tr>
  <tr>
    <td>0x1D8</td>
    <td>Item Search Result</td>
  </tr>
  <tr>
    <td>0x1D9</td>
    <td>Item Search End</td>
  </tr>
  <tr>
    <td>0x1DA</td>
    <td>Retainer Search End</td>
  </tr>
  <tr>
    <td>0x1DB</td>
    <td>Retainer Search Results</td>
  </tr>
  <tr>
    <td>0x1DC</td>
    <td>Retainer Search Update</td>
  </tr>
  <tr>
    <td>0x1DD</td>
    <td>Retainer Search Transaction History</td>
  </tr>
  <tr>
    <td>0x1DE</td>
    <td></td>
  </tr>
  <tr>
    <td>0x1DF</td>
    <td>Player Search Information Response</td>
  </tr>
  <tr>
    <td>0x1E0</td>
    <td>Player Search Comment Response</td>
  </tr>
  <tr>
    <td>0x1E1</td>
    <td>Close Item Search</td>
  </tr>
  <tr>
    <td>0x1F4</td>
    <td>DEPRECATED. GM?</td>
  </tr>
  <tr>
    <td>0x1F5</td>
    <td>DEPRECATED. GM?</td>
  </tr>
  <tr>
    <td>0x1F6</td>
    <td>DEPRECATED. GM?</td>
  </tr>
</table>

<table>
  <tr>
    <th colspan="6">Client -> Server</th>
  </tr>
  <tr>
    <th>Opcode</th>
    <th>Packet Name</th>
  </tr>
  <tr>
    <td>0x001</td>
    <td>Ping</td>
  </tr>
  <tr>
    <td>0x002</td>
    <td>Unknown 0x002</td>
  </tr>
  <tr>
    <td>0x003</td>
    <td>Say Message</td>
  </tr>
  <tr>
    <td>0x006</td>
    <td>Client Langauge</td>
  </tr>
  <tr>
    <td>0x007</td>
    <td>Unknown 0x007</td>
  </tr>
  <tr>
    <td>0x0CA</td>
    <td>Position Update</td>
  </tr>
  <tr>
    <td>0x0CC</td>
    <td>Target Locked</td>
  </tr>
  <tr>
    <td>0x0CD</td>
    <td>Target Selected</td>
  </tr>
  <tr>
    <td>0x0CE</td>
    <td>Starting/Ending Cutscene</td>
  </tr>
  <tr>
    <td>0x0CF</td>
    <td>Countdown Started</td>
  </tr>
  <tr>
    <td>0x12D</td>
    <td>Event Start Request</td>
  </tr>
  <tr>
    <td>0x12E</td>
    <td>Event Result</td>
  </tr>
  <tr>
    <td>0x12F</td>
    <td>Data Request</td>
  </tr>
  <tr>
    <td>0x130</td>
    <td>Linkshell Active Request</td>
  </tr>
  <tr>
    <td>0x131</td>
    <td>Item Package Update Request</td>
  </tr>
  <tr>
    <td>0x132</td>
    <td>Unknown 0x132</td>
  </tr>
  <tr>
    <td>0x133</td>
    <td>Group Created</td>
  </tr>
  <tr>
    <td>0x134</td>
    <td>Unknown 0x134</td>
  </tr>
  <tr>
    <td>0x135</td>
    <td>Achievement Progress Request</td>
  </tr>
  <tr>
    <td>0x1C3</td>
    <td>Recruitment Start Request</td>
  </tr>
  <tr>
    <td>0x1C4</td>
    <td>Recruitment End Request</td>
  </tr>
  <tr>
    <td>0x1C5</td>
    <td>Party Window Opened, State Request</td>
  </tr>
  <tr>
    <td>0x1C6</td>
    <td>Recruiting Accepted</td>
  </tr>
  <tr>
    <td>0x1C7</td>
    <td>Search Result Request</td>
  </tr>
  <tr>
    <td>0x1C8</td>
    <td>Get Recruitment Details</td>
  </tr>
  <tr>
    <td>0x1C9</td>
    <td>Blacklist Add</td>
  </tr>
  <tr>
    <td>0x1CA</td>
    <td>Blacklist Remove</td>
  </tr>
  <tr>
    <td>0x1CB</td>
    <td>Blacklist Request</td>
  </tr>
  <tr>
    <td>0x1CC</td>
    <td>Friendlist Add</td>
  </tr>
  <tr>
    <td>0x1CD</td>
    <td>Friendlist Remove</td>
  </tr>
  <tr>
    <td>0x1CE</td>
    <td>Friendlist Request</td>
  </tr>
  <tr>
    <td>0x1CF</td>
    <td>Friendlist Status Request</td>
  </tr>
  <tr>
    <td>0x1D0</td>
    <td>FAQ & Info List Request</td>
  </tr>
  <tr>
    <td>0x1D1</td>
    <td>FAQ & Info Body Request</td>
  </tr>
  <tr>
    <td>0x1D2</td>
    <td>Issue List Request</td>
  </tr>
  <tr>
    <td>0x1D3</td>
    <td>Is GM Ticket Active Request</td>
  </tr>
  <tr>
    <td>0x1D4</td>
    <td>GM Response Request</td>
  </tr>
  <tr>
    <td>0x1D5</td>
    <td>GM Ticket Sent</td>
  </tr>
  <tr>
    <td>0x1D6</td>
    <td>End GM Ticket Request</td>
  </tr>
  <tr>
    <td>0x1D7</td>
    <td>Track Retainer</td>
  </tr>
  <tr>
    <td>0x1D8</td>
    <td>Begin Item Category Search</td>
  </tr>
  <tr>
    <td>0x1D9</td>
    <td>Begin Retainer Search</td>
  </tr>
  <tr>
    <td>0x1DA</td>
    <td></td>
  </tr>
  <tr>
    <td>0x1DB</td>
    <td></td>
  </tr>
  <tr>
    <td>0x1DC</td>
    <td>Set Search Info</td>
  </tr>
  <tr>
    <td>0x1DD</td>
    <td>Begin Player Search</td>
  </tr>
  <tr>
    <td>0x1DE</td>
    <td></td>
  </tr>
  <tr>
    <td>0x1DF</td>
    <td>Begin Item Name Search</td>
  </tr>
</table>
