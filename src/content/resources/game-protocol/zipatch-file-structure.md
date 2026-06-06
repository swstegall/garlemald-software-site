## History

ZiPatch (.patch) files are a compressed file format for FINAL FANTASY XIV. This file format was later modified in 2012 for DRAGON QUEST X and FINAL FANTASY XIV: A Realm Reborn, which are more similar in their DAT structure to each other than to FINAL FANTASY XIV. As such, many of the block types that are found in this version have been deprecated. Static analysis of their executables indicate that they may still be able to read this version.

Initial, minimal research of the ZiPatch file format was made publically available [https://github.com/jpd002/SeventhUmbral/blob/master/launcher/PatchFile.cpp](https://github.com/jpd002/SeventhUmbral/blob/master/launcher/PatchFile.cpp) in 2013 by Jean-Philip Desjardins for his open-source server emulator for FINAL FANTASY XIV, SeventhUmbral [http://seventhumbral.org/](http://seventhumbral.org/). This implementation allowed the ZiPatch files that were backed up by Krizz [http://tehkrizz.net/](http://tehkrizz.net/) and others in the community to be applied to a new installation and improperly update the client to 1.23b.

## File Header

ZiPatch files have a unique file header (12 bytes), which is used to identify the file format. The ZiPatch File Header is immediately followed by *n* blocks, read until EOF, each of which provide ffxivupdater.exe with information to carry out specific instructions.

```
91 5A 49 50 41 54 43 48 0D 0A 1A 0A            ‘ZIPATCH....
```

## Block Structure

```c
struct block_t
{
    int size;          // LE
    char data[];       // size + 4
    unsigned long crc; // CRC32 (RFC 1952) of data
}
```

The slice, data[0..3], is a string used to identify the block type. Static analysis of ffxivupdater.exe indicates the following block types as valid.

```
"FHDR"
"APLY"
"APFS"
"ETRY"
"ADIR"
"DELD"
```

### FHDR

FHDR blocks provide an abstract of the changes that should occur as a result of applying the ZiPatch in terms of the type and count of the changes to be made to the filesystem.

```c
struct fhdr_t
{
    char version[4];  // [00 00 02 00] observed; Static analysis of ffxivupdater.exe indicates FileHeaderV2
    char result[4];   // "DIFF" or "HIST" observed
    int numEntryFile; // LE
    int numAddDir;    // LE
    int numDeleteDir; // LE
};
```

### APLY

APLY blocks have not been reversed. Two APLY blocks always appear immediately after the FHDR block.

```c
struct aply_t
{
    int unknown1; // [00 00 00 01] and [00 00 00 02] observed
    int unknown2; // [00 00 00 04] observed
    int unknown3; // [00 00 00 01] observed
};
```

### APFS

APFS blocks have not been observed. While unknown, it is assumed that APFS blocks may deal with the filesystem architecture in some way.

```c
struct apfs_t
{
};
```

Static analysis of ffxivupdater.exe indicates the following filesystem architectures as valid.

```
"NTFS"
"FAT"
"FAT12"
"FAT16"
"FAT32"
"CDFS"
"UDF"
"EXFAT"
```

It is unknown whether the following referenced text strings are also involved with APFS blocks.

```
"Total incremental file size: %lld"
"Total incremental disk size: %lld"
"Total incremental max disk size: %lld"
```

### ETRY

ETRY blocks provide the information for ffxivupdater.exe to make changes directly to the filesystem by performing explicit operations on the specified file path, relative to the installation directory. The operation is dependent on the chunk_t mode.

```c
struct etry_t
{
    int pathSize;     // LE
    char path[];      // pathSize
    int count;        // LE
    chunk_t chunks[]; // count
};

struct chunk_t
{
    int mode;            // [41 00 00 00] 'A'; [44 00 00 00] 'D'; [4D 00 00 00] 'M' observed
    char prevHash[20];   // SHA-1
    char nextHash[20];   // SHA-1
    int compressionMode; // [4E 00 00 00] 'N' and [5A 00 00 00] 'Z' observed
    int size;            // LE
    int prevSize;        // LE
    int nextSize;        // LE
    char data[];         // size
};
```

The chunk_t mode indicates whether the specific entry file chunk_t will be added *A*, deleted *D*, or modified *M*. In order to validate the operation, SHA-1 hashes are used to verify file deltas. The chunk_t compressionMode indicates whether the specific entry file chunk_t has no compression *N* or is compressed with the zlib algorithm *Z*.

### ADIR

ADIR blocks provide the information for ffxivupdater.exe to make changes directly to the filesystem by creating a new directory for the specified path, relative to the installation directory, if it does not already exist.

```c
struct adir_t
{
    int pathSize; // LE
    char path[];  // pathSize
};
```

### DELD

DELD blocks provide the information for ffxivupdater.exe to make changes directly to the filesystem by deleting the directory for the specified path, relative to the installation directory, if it exists.

```c
struct deld_t
{
    int pathSize; // LE
    char path[];  // pathSize
};
```
