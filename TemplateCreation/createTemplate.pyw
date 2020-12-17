from __future__ import unicode_literals
import math
import PySimpleGUI as sg

def keyCode(_x, _y):
    return str(_x) + "-" + str(_y)

sg.theme('SystemDefaultForReal')

buttons = [[sg.Combo(["L", "O", "G"], size=(1,2), key=keyCode(j,i)) for j in range(15)] for i in range(15)] + [[sg.Button("COMPILE")]]

output = [[sg.Output(size=(80,20))]]

tabs = [[sg.TabGroup([[sg.Tab("Editor", buttons), sg.Tab("Output", output)]])]]

window = sg.Window("Template Creator", tabs, font='Courier 12', default_element_size=(30, 2))
event, values = window.read()

while True:
    event, values = window.read()
    if event in (sg.WIN_CLOSED, 'Quit'):
        break
    print("{", end="")

    for i in range(15):
        for j in range(15):
            if i % 2 == 0 and j % 2 == 0:
                if values[keyCode(j,i)] == "G":
                    print("\"" + keyCode(j,i) + "\":\"G\",", end="")
                else:
                    if values[keyCode(j,i)] == "O":
                        print("\"" + keyCode(j,i) + "\":\"O\",", end="")
                    else:
                        print("\"" + keyCode(j,i) + "\":\"L\",", end="")
            else:
                if values[keyCode(j,i)] == "O":
                    print("\"" + keyCode(j,i) + "\":\"R\",", end="")
                else:
                    print("\"" + keyCode(j,i) + "\":\"U\",", end="")

    print("}")
    print("")
    print("DON'T FORGET TO REMOVE THE LAST COMMA!!!")