# Cockpit Samba AD DC Management Plugin

A Cockpit plugin for Samba AD DC Management. 

# Installing

## Fedora 32 Installation
1. Download the repository https://download.opensuse.org/repositories/home:/Hezekiah/Fedora_32/home:Hezekiah.repo

2. Place it to /etc/yum.repos.d/

3. Run the following command
```
# dnf install cockpit-samba-ad-dc
```

4. If you already have Cockpit on your server, point your web browser to: https://ip-address-of-machine:9090

5. Use your system user account and password to log in.

## Ubuntu 20.04 Installation
1. Update the apt package index and install packages to allow apt to use a repository over HTTPS:
```
$ sudo apt update
$ sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

2. Add Cockpit-Samba-AD-DC GPG key:
```
$ curl -fsSL https://download.opensuse.org/repositories/home:/Hezekiah/xUbuntu_20.04/Release.key | sudo apt-key add -
```

3.  Add the repository to the sources.list file
```
$ sudo add-apt-repository "deb https://download.opensuse.org/repositories/home:/Hezekiah/xUbuntu_20.04 ./"
```

4. Update the apt package index, and download the latest version of Cockpit-Samba-AD-DC plugin.
```
 $ sudo apt-get update
 $ sudo apt-get install cockpit-samba-ad-dc
```

5. If you already have Cockpit on your server, point your web browser to: https://ip-address-of-machine:9090

6. Use your system user account and password to log in.

## Debian 10 Installation
1. Update the apt package index and install packages to allow apt to use a repository over HTTPS:
```
$ sudo apt update
$ sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

2. Add Cockpit-Samba-AD-DC GPG key:
```
$ curl -fsSL https://download.opensuse.org/repositories/home:/Hezekiah/Debian_10/Release.key | sudo apt-key add -
```

3.  Add the repository to the sources.list file
```
$ sudo add-apt-repository "deb https://download.opensuse.org/repositories/home:/Hezekiah/Debian_10 ./"
```

4. Update the apt package index, and download the latest version of Cockpit-Samba-AD-DC plugin.
```
 $ sudo apt-get update
 $ sudo apt-get install cockpit-samba-ad-dc
```

5. If you already have Cockpit on your server, point your web browser to: https://ip-address-of-machine:9090

6. Use your system user account and password to log in.

# Getting and building the source

Make sure you have `npm` available (usually from your distribution package).
These commands check out the source and build it into the `dist/` directory:

```
git clone https://gitlab.com/HezekiahM/samba-ad-dc.git
cd samba-ad-dc
make
```

`make install` compiles and installs the package in `/usr/share/cockpit/`. The
convenience targets `srpm` and `rpm` build the source and binary rpms,
respectively. Both of these make use of the `dist-gzip` target, which is used
to generate the distribution tarball. In `production` mode, source files are
automatically minified and compressed. Set `NODE_ENV=production` if you want to
duplicate this behavior.

For development, you usually want to run your module straight out of the git
tree. To do that, link that to the location were `cockpit-bridge` looks for packages:

```
mkdir -p ~/.local/share/cockpit
ln -s `pwd`/dist ~/.local/share/cockpit/samba-ad-dc
```

After changing the code and running `make` again, reload the Cockpit page in
your browser.

You can also use
[watch mode](https://webpack.js.org/guides/development/#using-watch-mode) to
automatically update the webpack on every code change with

    $ npm run watch

or

    $ make watch

# Running eslint

The Project uses [ESLint](https://eslint.org/) to automatically check
JavaScript code style in `.js` and `.jsx` files.

The linter is executed within every build as a webpack preloader.

For developer convenience, the ESLint can be started explicitly by:

    $ npm run eslint

Violations of some rules can be fixed automatically by:

    $ npm run eslint:fix

Rules configuration can be found in the `.eslintrc.json` file.
