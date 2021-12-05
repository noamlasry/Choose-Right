import sys
import os

import xml.etree.ElementTree as ET


xml_url = "curl --user sys_pv_auto:111030170ed79863912dbb0380b8643a27 --request GET http://jenkins-master:8080/job/PV%20Jobs%20-By%20Projects/view/PATS%20TEAM/job/PV-MeTG--NIO_Py3_PATS/config.xml"
#temp = os.popen(xml_url).read().find("def")
#print(temp)
#print(temp.read())
#print(type(temp))

#temp = str(sys.argv[1:])
#print(' '.join(sys.argv[1:]))
sys.stdout.write(str(os.system(xml_url)))
sys.stdout.flush()


# if __name__ == "__main__":
#    print("3")
#    result = some_function()
#    sys.exit(result)