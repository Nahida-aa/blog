# import test
# from multiprocessing import Process
# import mypackage

# # print(test)
# # print(test.A)
# print(mypackage)
# print(mypackage.B)
# print(dir(mypackage))
# from mypackage import mymodule
# print(mymodule)

import mypackage.mymodule as m
# import mypackage.mymodule

print(m.__package__)
# print(mypackage.mymodule.__package__)
# print(dir(mypackage))