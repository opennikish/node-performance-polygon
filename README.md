### Node.js Performance Polygon

Run server with inspect mode:
```
node --inspect server.js
```

Open the chrome dev-tools:

```
chrome://inspect
```
Click to target there.


### Stress test

Dirty solution to do dummy requests - Apache Benchmark tool:

```
ab -k -c 100 -n 20000 http://localhost:7777/
```

```
n - Number of requests
c - (concurrency)  Number of multiple requests to make
k - Keep Alive connection
```

### ToDo

Simplify to find why memory increases after benchmark suites (ab -k -c 100 -n 20000):
first run - ~23mb
second run - ~34mb
