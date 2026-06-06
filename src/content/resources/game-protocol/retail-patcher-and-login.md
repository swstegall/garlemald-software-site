Originally the retail version of the game used a built in patcher and login program to both update and start the game. The patcher consists of two programs ffxivboot.exe and ffxivupdater.exe. The login program is ffxivlogin.exe. Finally the actual game is ffxivgame.exe.

## FFXIVBoot

This is the main application that is started when a user clicks on the "Final Fantasy XIV" shortcut. It facilitates version checking as well as patch downloading and verification. The patch downloader is a modified Bittorrent client, which causes problems with using non-ffxivboot clients. Interestingly ffxivboot was built on top of the Rapture engine and contains the same various RTTI info and referenced strings as the main ffxivgame executable. This was most likely to reuse the logic for rendering the Silverlight based UI, access game files, and to play the SCD music.

### Version Check

The first thing ffxivboot does after initialization is perform a version check for both ffxivboot and ffxivgame programs. A GET HTTP request is made to `ver01.ffxiv.com:54996` first for the boot program, followed by the game program. Both requests and responses have the same format.

`/patch/vercheck/ffxiv/win32/release/<game or boot>/<patchnumber>`

ie: `/patch/vercheck/ffxiv/win32/release/boot/2012.05.20.0000.0001`

If the version requested is up to date, the following is responded back:

```
header("HTTP/1.0 204 No Content");
header("Content-Location: ffxiv/2d2a390f/vercheck.dat");
header("X-Repository: ffxiv/win32/release/boot");
header("X-Patch-Module: ZiPatch");
header("X-Protocol: torrent");
header("X-Info-Url: http://www.example.com");
header("X-Latest-Version: 2012.09.19.0000");
```

If the version requested is out of date and an update is needed, the following is responded back:

```
header("HTTP/1.0 200 OK");
header("Content-Location: ffxiv/48eca647/vercheck.dat");
header("Content-Type: multipart/mixed; boundary=477D80B1_38BC_41d4_8B48_5273ADB89CAC");
header("X-Repository: ffxiv/win32/release/boot");
header("X-Patch-Module: ZiPatch");
header("X-Protocol: torrent");
header("X-Info-Url: http://example.com");
header("X-Latest-Version: 2012.05.20.0000.0001");
header("Connection: keep-alive")

--477D80B1_38BC_41d4_8B48_5273ADB89CAC
Content-Type: application/octet-stream
Content-Location: ffxiv/48eca647/metainfo/D2012.05.20.0000.0001.torrent
X-Patch-Length: 20874726
X-Signature: jqxmt9WQH1aXptNju6CmCdztFdaKbyOAVjdGw_DJvRiBJhnQL6UlDUcqxg2DeiIKhVzkjUm3hFXOVUFjygxCoPUmCwnbCaryNqVk_oTk_aZE4HGWNOEcAdBwf0Gb2SzwAtk69zs_5dLAtZ0mPpMuxWJiaNSvWjEmQ925BFwd7Vk=

[TORRENT FILE HERE]
--477D80B1_38BC_41d4_8B48_5273ADB89CAC--
```

Both responses contain the same HTTP headers:

- Content-Location: Defines the location on the user's computer (in `My Documents/My Games/Final Fantasy XIV/`) where the patch file is stored.
- X-Respository: Either `ffxiv/win32/release/boot` or `ffxiv/win32/release/game` depending on what's being version checked.
- X-Patch-Module: Defines what format the patch file is in. FFXIV used ZiPatch.
- X-Protocol: Defines how the patch will be downloaded. While the client makes reference to http (and FFXIV ARR uses that), ffxivboot does not have code to download by http.
- X-Info-Url: Unknown but always set to http://example.com.
- X-Latest-Version: The latest version of that program.

When the program is out of date the body of the HTTP response contains more information as well as the torrent file to get the patch. Of note is `Content-Location` which like the head, stores the torrent file under the same location. Next is `X-Patch-Length` which is the size of the torrent file, as well as the `X-Signature` used for source verification. The ffxivboot program will use OpenSSL's `rsa_verify` function to verify that the sent patch is from Square Enix. We can patch out the returned value from `rsa_verify` to always return true (valid). Interestingly this verification was removed in FFXIV ARR. Finally after the signature is a single line followed by the full .torrent file.

If the version was up to date, ffxivboot will then continue and launch ffxivlogin to handle session login. Otherwise the patch downloader is started.

### Patch Downloader

Once downloaded the necessary files will be stored like this:

- `<FFXIV Games Folder>/downloads/ffxiv/<program hash>/vercheck.dat` - This is just the response returned above, stored in a file.
- `<FFXIV Games Folder>/downloads/ffxiv/<program hash>/metainfo/D2012.05.20.0000.0001.torrent` - The torrent file.
- `<FFXIV Games Folder>/downloads/ffxiv/<program hash>/patch/D2012.05.20.0000.0001.patch` - The actual patch file that is being downloaded.

For all intents and purposes the FFXIV patch downloader is an off-the-shelf Bittorrent client, with the peer handshake functionality modified.

- The protocol name is changed from `BitTorrent protocol` to `SqexPatchSystem v01`
- The `infoHash` is Blowfish encrypted using the `peerId` as a key.

The rest of the protocol is standard Bittorrent and does not require any special use case.

Once the patch is fully downloaded ffxivboot adds a file `boot.ver.updating` or `game.ver.updating` in the same directory.

The ffxivupdate program is copied to the `<FFXIV Games Folder>/downloads` folder and a `downloaded_boot_patch.list` file is created with a list of patch paths to install. Then ffxivupdate is launched.

## FFXIVUpdater

The FFXIV patch files is the ZiPatch File Structure. The updater iterates over every block in the patch and executes the command defined. Once patching is complete, FFXIVBoot is restarted.

## FFXIVLogin

The final step is logging in. This program is quite simple, yet has some extra encoding that makes modifications difficult. Primarily it's an old implementation of an Internet Explorer browser (4.0 iirc). However what makes it difficult is that all strings are encoded using a strange algorithm so that they cannot be easily modified. This includes the URL of the login page itself.

The browser goes to this url: `http://account.square-enix.com/account/content/ffxivlogin`

On every response the program reads the HTML body and searches for this custom tag:

`<x-sqexauth sid="" lang="" region="" utc="" />`

- sid: The session id of the now logged in user. This will be passed to ffxivgame.
- lang: The language the user is using. Shouldn't matter.
- region: The region the user is in. Shouldn't matter.
- utc: Used to generate the Blowfish key that ffxivgame's login connection will use to communicate with the lobby server.

Once this tag is detected the params are encoded and then sent as a command line argument to ffxivgame.

### Command Line Argument Encoding

First the following string is built and filled out (matching the above args).

`T =%d /LANG =%s /REGION =%d /SERVER_UTC =%s /SESSION_ID =%s`

Where T is the current tick count, and LANG/REGION/SERVER_UTC/SESSION_ID match what the server responded with after login. These will be retrieved and sent to the lobby server on boot.

The above string is then Blowfish encoded using the T value as the key and base64ed (with '+' -> '-' and '/' -> '_').

Finally ffxivgame.exe is launched. The command line argument is built like this: `ffxivgame.exe sqex0002<base64edArgs>////`

### String Decode Algorithm

Converted from the raw ASM in ffxivlogin.exe.

```csharp
public static string FFXIVLoginStringDecode(byte[] data)
{
    string result = "";
    uint key = (uint)data[0] << 8 | data[1];
    uint key2 = data[2];
    key = RotateRight(key, 1) & 0xFFFF;
    key -= 0x22AF;
    key2 = key2 ^ key;
    key = RotateRight(key, 1) & 0xFFFF;
    key -= 0x22AF;
    uint finalKey = key;
    key = data[3];
    uint count = (key2 & 0xFF) << 8;
    key = key ^ finalKey;
    key &= 0xFF;
    count |= key;

    int count2 = 0;
    while (count != 0)
    {
        uint encrypted = data[4 + count2];
        finalKey = RotateRight(finalKey, 1) & 0xFFFF;
        finalKey -= 0x22AF;
        encrypted = encrypted ^ (finalKey & 0xFF);
        result += (char)encrypted;
        count--;
        count2++;
    }

    return result;
}
```

### Reversed Encode Algorithm

This was made by working the decode algorithm backwards.

```csharp
public static byte[] FFXIVLoginStringEncode(uint key, string text)
{
    key = key & 0xFFFF;

    uint count = 0;
    byte[] asciiBytes = Encoding.ASCII.GetBytes(text);
    byte[] result = new byte[4 + text.Length];
    for (count = 0; count < text.Length; count++)
    {
        result[result.Length - count - 1] = (byte)(asciiBytes[asciiBytes.Length - count - 1] ^ (key & 0xFF));
        key += 0x22AF;
        key &= 0xFFFF;
        key = RotateLeft(key, 1) & 0xFFFF;
    }

    count = count ^ key;
    result[3] = (byte)(count & 0xFF);

    key += 0x22AF & 0xFFFF;
    key = RotateLeft(key, 1) & 0xFFFF;

    result[2] = (byte)(key & 0xFF);

    key += 0x22AF & 0xFFFF;
    key = RotateLeft(key, 1) & 0xFFFF;

    result[1] = (byte)(key & 0xFF);
    result[0] = (byte)((key >> 8) & 0xFF);

    return result;
}
```

## Rerouting the Programs

- The url and port values in ffxivboot have to be change to point to your own server.
- The `rsa_verify` function has to be reprogrammed to return "true" at all times. In the last boot version the signature is `8B 44 24 24 83 C4 0C 5B 5F 5D 5E` and has to be changed to `B8 01 00 00 00 90 90 5B 5F 5D 5E`.
- On the web server, the proper responses have to be returned when the version check happens.
- A new URL to the login server has to be encoded and replaced in the ffxivlogin binary. The web server should add the auth tag once the session is ready.

## Other Notes

- In the Alpha ffxivboot; rsa_verify signature is: `8B 44 24 20 83 C4 0C 5F 5B 5D 5E`.

## Gallery

![Downloading a patch using the built in torrent client in ffxivboot alpha.](/img/resources/retail-patcher-and-login/Ffxivboot_alpha_download.png)

*Downloading a patch using the built in torrent client in ffxivboot alpha.*

![Downloading a patch using the built in torrent client in ffxivboot.](/img/resources/retail-patcher-and-login/Ffxivboot_download.png)

*Downloading a patch using the built in torrent client in ffxivboot.*

![The ffxivlogin program post-2012.](/img/resources/retail-patcher-and-login/Ffxivlogin.png)

*The ffxivlogin program post-2012.*
