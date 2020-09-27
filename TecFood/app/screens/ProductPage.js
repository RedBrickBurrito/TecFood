import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View, Text, Dimensions } from 'react-native'
import { Card, CheckBox, Divider, Input, Modal, Button } from '@ui-kitten/components'
import { handleProductRequest } from '../../services/ProductService'

const {height, width} = Dimensions.get('window')

function ProductPage(props) {
    const [special, setSpecial] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [checkboxes, setCheckboxes] = useState({agave: false, maple: false})
    const [productData, setProductData] = useState({})

    const { product_id, visible, hide } = props
    const imageUrl = 'https://s3-alpha-sig.figma.com/img/c059/38b9/43d9b3db7155c9cdd5601c7ddb8797a9?Expires=1601856000&Signature=HNT~CL2eW0RZE8p4eJSLyf6bDllg19VRovICw1D5fv69VskqnxlSLgCQ~DSNgLRArjDZ573edtXMmTJ04~JfVgvliaRBAVYCnP6da~zVR4DkxuZioonai9iQizZsgC~6TSScmJNRF~tFBzCwHIQW-CoDkyCkWMpZGqpx6WQGqn5mo1tRMeYUlHug2RfTkmHztjW5LhhsSwMmqRpWDx2B3MbLB5cl8pTYyxVujF7SP4xrifKd6qEFr6eAoPJFyCpEHwCSckFIVwPcakLvPUKmyGtUflMr-Inq8SOncpZgsG43QVJC4J-VhQHqFku6KiirY2p7MGv86MJayTUOZS6WJA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'

    useEffect(() => {
        setProductData(handleProductRequest(product_id))
    }, []);

    const handlePress = (sign) => {
        if(sign === 'minus') {
            if(quantity > 1) {
                setQuantity(quantity - 1)
            } else {
                setQuantity(1)
            }
        } else {
            setQuantity(quantity + 1)
        }
    }

    return (
        <Modal 
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={hide}
        >
            <Card style={styles.card}>
                <View style={styles.content}>
                    <Image source={{uri: imageUrl}} style={styles.productImage} resizeMode='cover'/>
                    <View style={styles.attributes}>
                        <Text style={styles.title}>Select Honey</Text>
                        <View>
                            <CheckBox  
                                checked={checkboxes.agave} 
                                onChange={next => setCheckboxes({...checkboxes, agave: next})}
                            >Agave Syrup</CheckBox>
                            <CheckBox 
                                checked={checkboxes.maple} 
                                onChange={next => setCheckboxes({...checkboxes, maple: next})}
                            >Maple Syrup</CheckBox>
                        </View>
                        <Divider style={styles.divider}/>
                        <Text style={styles.title}>Special Instructions</Text>
                        <Input
                            placeholder="Extra napkins, sauce..."
                            value={special}
                            onChangeText={value => setSpecial(value)}
                            style={styles.input}
                            textStyle={styles.inputText}
                        />
                    </View>
                    <View style={{display: 'flex', justifyContent: 'space-between', height: '20%'}}>
                        <View style={styles.quantity}>
                            <Button style={styles.qtyButton} onPress={() => handlePress('minus')} size='small'><Text style={styles.qtyButtonText}>-</Text></Button>
                            <Text style={styles.qtyText}>{quantity}</Text>
                            <Button style={styles.qtyButton} onPress={() => handlePress('plus')} size='small'><Text style={styles.qtyButtonText}>+</Text></Button>
                        </View>
                        <Button style={styles.addToCart} size='small'><Text style={styles.addToCartText}>Add to Cart</Text></Button>
                    </View>
                </View>
            </Card>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    card: {
        borderRadius: 29,
        backgroundColor: '#F7FBFB',
    },
    content: {
        width: width * 0.70, 
        minHeight: height * 0.50, 
        display: 'flex', 
        justifyContent: 'space-between',
        bottom: 16,
    },
    productImage: {
        alignSelf: 'center',
        width: width * 0.85,
        height: '30%',
        borderRadius: 29,
    },
    attributes: {
        display: 'flex',
        justifyContent: 'space-evenly',
        minHeight: '50%',
    },
    title: {
        fontFamily: 'OpenSans_Regular',
        fontWeight: 'bold',
        fontSize: 20,
    },
    divider: {
        backgroundColor: '#C4C4C4',
    },
    input: {
        borderRadius: 29,
        backgroundColor: '#ECECEC',
    },
    inputText: {
        color: "#172A3A",
    },
    quantity: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    qtyButton: {
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 30,
    },
    qtyButtonText: {
        color: 'black',
        fontSize: 15,
    },
    qtyText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    addToCart: {
        alignSelf: 'center',
        borderRadius: 29,
        width: '70%',
    },
    addToCartText: {
        fontSize: 20,
    }
})

export default ProductPage