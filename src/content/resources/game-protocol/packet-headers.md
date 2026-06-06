FFXIV uses the TCP protocol to communicate with both the map servers as well as the lobby servers. Commands are separated into subpackets, which can be combined into one base packet. The maximum packet size is 0xFFFF.

## Base Packets

This is the main packet container for all subpackets. It can contain a number of subpackets to be processed. Each base packet begins with a 0x10 byte header. Below is how the base packet header is laid out:

<table>
  <tr>
    <th>0</th>
    <th>1</th>
    <th>2</th>
    <th>3</th>
    <th>4</th>
    <th>5</th>
    <th>6</th>
    <th>7</th>
    <th>8</th>
    <th>9</th>
    <th>A</th>
    <th>B</th>
    <th>C</th>
    <th>D</th>
    <th>E</th>
    <th>F</th>
  </tr>
  <tr>
    <td colspan="1">Is Authenticated</td>
    <td colspan="1">Is Compressed/Encoded</td>
    <td colspan="2">Connection Type</td>
    <td colspan="2">Packet Size</td>
    <td colspan="2">Number of Subpackets</td>
    <td colspan="8">Timestamp in Miliseconds</td>
  </tr>
</table>

These are the descriptions of the fields:

- <strong>Is Authenticated</strong>: 99% of the time this will be 1. It is only set to 0 on the initial handshake packet.
- <strong>Is Compressed/Encoded</strong>: The meaning of this byte depends if the client is communicating to the lobby server or the map server. If it is the lobby server, it indicates the packet is currently encrypted using Blowfish. If it is to the map server, it means the packet is compressed using zip compression. The server can set these to 0 and send unencrypted/uncompressed packets and have them read properly. Great for development and debugging.
- <strong>Connection Type</strong>: When the client connects to the map server, these will be flagged either 0x1 (Zone Connection), 0x2 (Chat Connection), or 0x3 (Lobby Connection) to define the connection type of the socket. After the server responds, these will always be set to 0x0. Not tested for lobby server.
- <strong>Packet Size</strong>: The total size of the packet including header.
- <strong>Number of Subpackets</strong>: The number of subpackets this base packet contains.
- <strong>Timestamp in Miliseconds</strong>: A unix timestamp in miliseconds.

## Subpackets

A base packet can hold a number of subpackets. Each one begins with a 0x10 byte header. Below is how the subpacket header is laid out:

<table>
  <tr>
    <th>0</th>
    <th>1</th>
    <th>2</th>
    <th>3</th>
    <th>4</th>
    <th>5</th>
    <th>6</th>
    <th>7</th>
    <th>8</th>
    <th>9</th>
    <th>A</th>
    <th>B</th>
    <th>C</th>
    <th>D</th>
    <th>E</th>
    <th>F</th>
  </tr>
  <tr>
    <td colspan="2">Subpacket Size</td>
    <td colspan="2">Type</td>
    <td colspan="4">Source Id</td>
    <td colspan="4">Target Id</td>
    <td colspan="4">Unknown</td>
  </tr>
</table>

These are the descriptions of the fields:

- <strong>Subpacket Size</strong>: The total size of the subpacket including header.
- <strong>Type</strong>: This field defines what this subpacket does:
  - 0x0: Initial Handshake
  - 0x2: Zone Server Related (Unknown)
  - 0x3: Game Packet
  - 0x7: Zone Server Related (Unknown)
  - 0x8: Zone Server Related (Unknown)
- <strong>Source Id</strong>: The actor that triggered this subpacket.
- <strong>Target Id</strong>: The actor this subpacket is for.
- <strong>Unknown</strong>: Still have not figured out what this field does.

## Game Packets

Type 0x3 subpackets are the main game packets that both the lobby and map server use to control the game. They also have their own header after the subpacket header. It is 0x10 bytes in size.

<table>
  <tr>
    <th>0</th>
    <th>1</th>
    <th>2</th>
    <th>3</th>
    <th>4</th>
    <th>5</th>
    <th>6</th>
    <th>7</th>
    <th>8</th>
    <th>9</th>
    <th>A</th>
    <th>B</th>
    <th>C</th>
    <th>D</th>
    <th>E</th>
    <th>F</th>
  </tr>
  <tr>
    <td colspan="2">Unknown (Always 0x14)</td>
    <td colspan="2">Opcode</td>
    <td colspan="4">Unknown (Always 0x00)</td>
    <td colspan="4">Timestamp</td>
    <td colspan="4">Unknown</td>
  </tr>
</table>

These are the descriptions of the fields:

- <strong>Opcode</strong>: The opcode defining what this game packet does. Check the page Opcodes for a list of opcodes.
- <strong>Timestamp</strong>: The current time in seconds. This is used for setting the game time as well and tracking connection health.

## Other Types

While 99% of packets are type 0x3, there are a few other packet types that follow a different format.

<table>
  <tr>
    <th colspan="6">Server -> Client</th>
  </tr>
  <tr>
    <th>Opcode</th>
    <th>Packet Name</th>
  </tr>
  <tr>
    <td>0x02</td>
    <td>SetupPacket Response, 0x38 in size.</td>
  </tr>
  <tr>
    <td>0x03</td>
    <td>Game Packet</td>
  </tr>
  <tr>
    <td>0x07</td>
    <td>Zone Start? 0x18 in size.</td>
  </tr>
  <tr>
    <td>0x08</td>
    <td>Pong Response</td>
  </tr>
  <tr>
    <td>0x0A</td>
    <td>SecSetupPacket Response, 0x290 in size.</td>
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
    <td>0x01</td>
    <td>SetupPacket, 0x38 in size.</td>
  </tr>
  <tr>
    <td>0x03</td>
    <td>Game Packet</td>
  </tr>
  <tr>
    <td>0x07</td>
    <td>Ping</td>
  </tr>
  <tr>
    <td>0x08</td>
    <td>Zone Start Response</td>
  </tr>
  <tr>
    <td>0x09</td>
    <td>SecSetupPacket, 0x278 in size.</td>
  </tr>
</table>
