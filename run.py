import requests
import concurrent.futures
import time

#url = "http://192.168.49.2:30080/api/libros/load"
url = "http://192.168.49.2:30080/api/libros"
requests_per_batch = 500
batches = 400
max_workers = 100

def send_request(i):
    try:
        r = requests.get(url, timeout=1)
        print(f"Request {i} status: {r.status_code}")
    except Exception as e:
        print(f"Request {i} failed: {e}")

for batch in range(batches):
    start_batch = time.time()
    print(f"Starting batch {batch+1} with {requests_per_batch} requests...")
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [executor.submit(send_request, batch * requests_per_batch + i) for i in range(requests_per_batch)]
        concurrent.futures.wait(futures)
    
    end_batch = time.time()
    print(f"Batch {batch+1} completed in {end_batch - start_batch:.2f} seconds")

print("Stress test completo")
