ARS-Progress-Chart
==================

Chart for [ARS project](https://reisomdewereldin80dagen.nelen-schuurmans.nl/#/).


Development
===========

Run [ARS](https://github.com/nens/ars) on port 5000 (dockerized, see [README.rst](https://github.com/nens/ars/blob/master/README.rst#development-with-docker))

Then run:
```bash
$ yarn install
$ yarn start
```


Production
==========

```bash
$ yarn run build
```

Releasing
=========
First, run `yarn install` and `yarn run build` so you see the file `dist/ars-progress-chart.js`.
Make sure to add a valid token with enough permission to `deploy/auth.json`.

Then run:

```bash
$ yarn run release
```

It will appear in the [Releases section on Github](https://github.com/nens/ars-progress-chart/releases).
This bundle will be pulled into [ARS](https://github.com/nens/ars) during the `buildout` process.
