import React, { useState } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { Card, CheckBox, Divider, Input, Modal, Button } from '@ui-kitten/components'
import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from "react-native-responsive-screen";
import { handleProductRequest } from '../../services/ProductService'


function ProductPage(props) {
    const [special, setSpecial] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [checkboxes, setCheckboxes] = useState({agave: false, maple: false})

    const { product_id, visible, hide } = props
    const imageUrl = 'https://s3-alpha-sig.figma.com/img/c059/38b9/43d9b3db7155c9cdd5601c7ddb8797a9?Expires=1601856000&Signature=HNT~CL2eW0RZE8p4eJSLyf6bDllg19VRovICw1D5fv69VskqnxlSLgCQ~DSNgLRArjDZ573edtXMmTJ04~JfVgvliaRBAVYCnP6da~zVR4DkxuZioonai9iQizZsgC~6TSScmJNRF~tFBzCwHIQW-CoDkyCkWMpZGqpx6WQGqn5mo1tRMeYUlHug2RfTkmHztjW5LhhsSwMmqRpWDx2B3MbLB5cl8pTYyxVujF7SP4xrifKd6qEFr6eAoPJFyCpEHwCSckFIVwPcakLvPUKmyGtUflMr-Inq8SOncpZgsG43QVJC4J-VhQHqFku6KiirY2p7MGv86MJayTUOZS6WJA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'

    const productData = handleProductRequest(product_id);

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
                <Image source={{uri: imageUrl}} style={styles.productImage} resizeMode='cover'/>
                <View style={styles.content}>
                    <Text style={styles.title}>Seleccionar Miel</Text>
                    <View>
                        <CheckBox  
                          checked={checkboxes.agave} 
                          style={styles.attributes} 
                          onChange={next => setCheckboxes({...checkboxes, agave: next})}
                        >Miel de Agave</CheckBox>
                        <CheckBox 
                          checked={checkboxes.maple} 
                          style={styles.attributes}
                          onChange={next => setCheckboxes({...checkboxes, maple: next})}
                        >Miel de Maple</CheckBox>
                    </View>
                    <Divider style={styles.divider}/>
                    <Text style={styles.title}>Instrucciones Especiales</Text>
                    <Input
                        placeholder="Cervilletas extra, mas salsa..."
                        value={special}
                        onChangeText={value => setSpecial(value)}
                        style={styles.input}
                        textStyle={styles.inputText}
                    />
                    
                </View>
                <View>
                    <View style={styles.quantity}>
                        <Button style={styles.qtyButton} onPress={() => handlePress('minus')}><Text style={styles.qtyButtonText}>-</Text></Button>
                        <Text style={styles.qtyText}>{quantity}</Text>
                        <Button style={styles.qtyButton} onPress={() => handlePress('plus')}><Text style={styles.qtyButtonText}>+</Text></Button>
                    </View>
                    <Button style={styles.addToCart}><Text style={styles.addToCartText}>Añadir al carrito</Text></Button>
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: wp('85%'),
        height: hp('75%'),
        borderRadius: 29,
        backgroundColor: '#F7FBFB',
    },
    productImage: {
        alignSelf: 'center',
        width: wp('85%'),
        height: '30%',
        borderRadius: 29,
        margin: -16,
    },
    content: {
        padding: '10%',
        flexDirection: 'column',
    },
    title: {
        margin: '2%',
        fontFamily: 'OpenSans_Regular',
        fontWeight: 'bold',
        fontSize: 20,
    },
    attributes: {
        margin: '2%',
    },
    divider: {
        marginTop: '8%',
        marginBottom: '8%',
        backgroundColor: '#C4C4C4',
    },
    input: {
        marginTop: '5%',
        borderRadius: 29,
        backgroundColor: '#ECECEC',
    },
    inputText: {
        color: "#172A3A",
    },
    quantity: {
        alignItems: 'center',
        alignSelf:'center',
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '10%',
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
        marginTop: '5%',
        alignSelf: 'center',
        borderRadius: 29,
        width: '70%',
    },
    addToCartText: {
        fontSize: 20,
    }
})

export default ProductPage