# Notes
## Steps

```bash
docker build -f mac.Dockerfile -t gitio:latest .
docker run -v $PWD:/data gitio python3 scripts/parse_roam.py --hugo /data

hugo server --bind 127.0.0.1 --baseURL http://127.0.0.1 --disableFastRender
```

## TODO

- Modify count with javascript interaction
- Resume / Projects / Emacs pages
- Delete search page for now
