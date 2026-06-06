## (WIP) Research

The following have thus far been gleamed from videos to determine the 'rules' of XIV's weather system as far as what retail was doing.

- Weather in a given location can only change every eight hours, at, 00:00, 08:00. and 16:00
  - Weather can last more than one cycle
  - Weather transition times appears to generally be 5 seconds for open content, and instanced areas 1 second.  A couple video instances of estimate 10s for Gloomy and Sandy.

- Cities do not use anything beyond the first four IDs in regular scenarios (ex. When event weather isn't in effect)
  - City weather is separate from the weather of the neighbouring field zone

- Some zones may inherit the weather of its parent zone?
  - Thus far it appears open dungeons take the weather from the field they're from
  - Inns and Grand Company offices might inherit the weather of their respective city?  That or just a lot of coincidences found thus far in videos.

- Market Wards are always Clear weather?
- Merchants Ward (Waking Sands) is always Fine weather?

- Aurora weather was added in 1.23a, appears to have been made part of the regular weather cycles for the regions, cities included.

- Instanced content and PrivateAreas can set its weather irrespective of the zone
  - Ex. Ul'dah's intro tutorial in one video had Fine weather throughout the whole process and cycle, then once regular gameplay was reached it was Cloudy in the actual zone

TO-DO

- See if there's any patterns of weather required for the non-base four weathers.  Ex. Can Stormy weather come on its own volition, or does it only follow certain weathers.
- Find more sources to further validate the above points made.
- Check Dalamud vids at somepoint to see if it applies to *every* zone permanently for that given update
- Check ferry vids to see if it's timed to a weather cycle along the way to match the zone it's heading to

## Region Table

A list of which regions have files related to varying weather effects.  The client appears to default to the first weather entry for that given region if one is set by the server which doesn't exist for that region.

Duplicated Region IDs were dropped as they all appeared to use the same weather.

<table>
  <thead>
    <tr>
      <th>Weather Name</th>
      <th>Internal Name</th>
      <th>ID</th>
      <th>101<br />sea_s0</th>
      <th>102<br />roc_r0</th>
      <th>103<br />fst_f0</th>
      <th>104<br />wil_w0</th>
      <th>105<br />lak_l0</th>
      <th>108<br />sea_s1</th>
      <th>109<br />roc_r1</th>
      <th>111<br />ocn_o0</th>
      <th>112<br />ocn_o1</th>
      <th>113<br />ocn_o2</th>
      <th>202<br />prv_s0</th>
      <th>204<br />prv_f0</th>
      <th>205<br />prv_w0</th>
      <th>207<br />000_10</th>
      <th>208<br />prv_00</th>
      <th>209<br />prv_i0</th>
      <th>801<br />art_s0</th>
      <th>802<br />art_r0</th>
      <th>803<br />art_f0</th>
      <th>804<br />art_w0</th>
      <th>805<br />srt_o0</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">WEATHER_CLEAR</td><td>wtr_fine</td><td>8001</td>
      <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_FINE</td><td>wtr_suny</td><td>8002</td>
      <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td></td><td>✅</td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_CLOUDY</td><td>wtr_clod</td><td>8003</td>
      <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td></td><td></td><td>✅</td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_FOGGY</td><td>wtr_mist</td><td>8004</td>
      <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td></td><td></td><td>✅</td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_WINDY</td><td></td><td>8005</td>
      <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_BLUSTERY</td><td>wtr_stom</td><td>8006</td>
      <td>✅</td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td><td>✅</td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_RAINY</td><td>wtr_rain</td><td>8007</td>
      <td>✅</td><td>✅</td><td></td><td>✅</td><td>✅</td><td>✅</td><td></td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td>✅</td><td></td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_SHOWERY</td><td></td><td>8008</td>
      <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_THUNDERY</td><td></td><td>8009</td>
      <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_STORMY</td><td>wtr_bolt</td><td>8010</td>
      <td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td>✅</td><td>✅</td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td><td></td><td>✅</td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_DUSTY</td><td></td><td>8011</td>
      <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_SANDY</td><td>wtr_sand</td><td>8012</td>
      <td></td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_HOT</td><td></td><td>8013</td>
      <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_BLISTERING</td><td>wtr_heat</td><td>8014</td>
      <td></td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_SNOWY</td><td></td><td>8015</td>
      <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_WINTRY</td><td></td><td>8016</td>
      <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_GLOOMY</td><td>wtr_fogd</td><td>8017</td>
      <td></td><td></td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_SEASONAL</td><td>wtr_hall</td><td>8027</td>
      <td>✅</td><td></td><td>✅</td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_PRIMAL</td><td>wtr_smmn</td><td>8028</td>
      <td></td><td>✅</td><td>✅</td><td>✅</td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_SEASONAL_FIREWORKS</td><td>wtr_smmr</td><td>8029</td>
      <td>✅</td><td></td><td>✅</td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_DALAMUD</td><td>wtr_comp</td><td>8030</td>
      <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_AURORA</td><td>wtr_chry</td><td>8031</td>
      <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_DALAMUDTHUNDER</td><td>wtr_xmas</td><td>8032</td>
      <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_DAY</td><td>wtr_h001</td><td>8065</td>
      <td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">WEATHER_TWILIGHT</td><td>wtr_h002</td><td>8066</td>
      <td>✅</td><td></td><td>✅</td><td>✅</td><td></td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">???</td><td>wtr_h003</td><td>8067</td>
      <td></td><td></td><td>✅</td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">???</td><td>wtr_h004</td><td>8068</td>
      <td></td><td></td><td>✅</td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">???</td><td>wtr_h005</td><td>8069</td>
      <td></td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
    <tr>
      <td style="text-align:left">???</td><td>wtr_e001</td><td>8081</td>
      <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>✅</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>
  </tbody>
</table>
