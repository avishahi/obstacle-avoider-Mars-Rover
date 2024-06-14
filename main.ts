function Left () {
    I2C_LCD1602.clear()
    DistanceCovered = 0
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
    pins.analogWritePin(AnalogPin.P8, 0)
    pins.analogWritePin(AnalogPin.P12, 1023)
    pins.analogWritePin(AnalogPin.P13, 1023)
    pins.analogWritePin(AnalogPin.P14, 0)
    DistanceCovered = DistanceCovered + (WheelCircumference + 1000)
    servos.P0.setRange(53, 128)
    I2C_LCD1602.ShowString("Distance: ", 0, 0)
    I2C_LCD1602.ShowNumber(DistanceCovered, 13, 0)
    basic.pause(100)
}
function Forward () {
    I2C_LCD1602.clear()
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    pins.analogWritePin(AnalogPin.P8, 400)
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, 400)
    pins.analogWritePin(AnalogPin.P14, 0)
    DistanceCovered = DistanceCovered + (WheelCircumference + 1000)
    I2C_LCD1602.ShowString("Distance: ", 0, 0)
    I2C_LCD1602.ShowNumber(DistanceCovered, 13, 0)
    basic.pause(100)
}
function stop () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        `)
    pins.analogWritePin(AnalogPin.P8, 0)
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    basic.pause(1000)
}
let WheelCircumference = 0
let DistanceCovered = 0
let WheelDiameter = 66
DistanceCovered = 0
WheelCircumference = WheelDiameter * 3.14
dht11_dht22.selectTempType(tempType.celsius)
dht11_dht22.queryData(
DHTtype.DHT11,
DigitalPin.P15,
true,
false,
true
)
basic.showLeds(`
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    . . . . .
    `)
servos.P0.setAngle(90)
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P1, DigitalPin.P2)
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.on()
I2C_LCD1602.BacklightOn()
basic.forever(function () {
    if (makerbit.isUltrasonicDistanceLessThan(20, DistanceUnit.CM)) {
        servos.P0.setRange(0, 180)
        servos.P0.setRange(36, 144)
        servos.P0.setRange(53, 128)
        Left()
    } else {
        Forward()
        servos.P0.setRange(0, 90)
    }
    I2C_LCD1602.ShowString("Temperature", 0, 1)
    I2C_LCD1602.ShowNumber(input.temperature(), 13, 1)
    basic.pause(500)
})
