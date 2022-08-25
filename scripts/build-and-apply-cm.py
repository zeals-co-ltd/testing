import os
import subprocess

# Get all js files in src/load_test_event_slayers/manifests/configMaps and break them in this form
# {file_name: file_path}

# Then build a kubectl create cm command which looks like this:
# kubectl create cm {file.name} --from-file {file.path} -n load-test

def get_cm_dict() -> dict:
    path = "./src/load_test_event_slayers/tests"
    cm_paths = os.listdir(path)

    cm_dict = {}

    for cm in cm_paths:
        cm_dict[os.path.splitext(cm)[0]] = cm

    return cm_dict

def create_cm(cm_dict: dict):
    print(f"PWD = {os.getcwd()} \n Configmaps to be created:")

    [print(f"name = {k}, file = {v}") for k,v in cm_dict.items()]
    for k,v in cm_dict.items():
        print(f"Configmap being created: name = {k}, file = {v}")
        # command = f"kubectl create cm {k} --from-file={os.getcwd()}/src/load_test_event_slayers/tests/{v} -n load-test"
        subprocess.run(["kubectl", "create", "cm", k, f"--from-file={os.getcwd()}/src/load_test_event_slayers/tests/{v}", "-n", "load-test"])

def create_k6_resource(cm_dict):
    for k,v in cm_dict.items():
        print(f"Applying cm: {k} {v}")
        file = f'''apiVersion: k6.io/v1alpha1
kind: K6
metadata:
  name: k6-{k}
  namespace: load-test
spec:
  parallelism: 4
  cleanup: "post"
  arguments: --out statsd
  script:
    configMap:'''
        file += "\n"
        file += f"      name: {k}\n"
        file += f"      file: {v}\n"
        file += f'''  runner:
      image: loadimpact/k6:latest
      env:
        - name: K6_STATSD_ENABLE_TAGS
          value: "true"
        - name: K6_STATSD_ADDR
          value: 10.4.4.211:8125'''
        if os.path.exists("k6.yaml"):
            os.remove("k6.yaml")
        f = open("k6.yaml", "x")
        f.write(file)
        f.close()
        subprocess.run(["kubectl", "apply", "-f", "k6.yaml"])
        os.remove("k6.yaml")
    
    

def main():
    # Build a Configmap dict
    cm_dict = get_cm_dict()
    # Using the configMap create the ConfigMaps and apply it on cluster
    create_cm(cm_dict)
    # Build and apply k6 cr for every cm
    create_k6_resource(cm_dict)

if __name__ == "__main__":
    main()

