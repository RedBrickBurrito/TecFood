import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import { Card, CheckBox, Modal } from '@ui-kitten/components'
import { 
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from "react-native-responsive-screen";
import { handleProductRequest } from '../../services/ProductService'


function ProductPage(props) {
    const { product_id, visible, hide } = props

    const productData = handleProductRequest(product_id);

    return (
        <Modal 
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={hide}
        >
            <Card style={styles.card}>
                <ImageBackground style={styles.productImage}/>
                <View style={styles.content}>
                    <Text style={styles.attributesTitle}>Seleccionar Miel</Text>
                    <View>
                        <CheckBox>Miel de Agave</CheckBox>
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
        alignSelf: 'center',
        width: wp('85%'),
        height: hp('75%'),
        top: hp('8%'),
        borderRadius: 29,
        backgroundColor: '#F7FBFB',
    },
    productImage: {
        width: '100%',
        height: '25%',
        borderRadius: 29,
    },
    content: {
        padding: '10%'
    },
    attributesTitle: {
        fontFamily: 'OpenSans_Regular',
        fontWeight: 'bold',
        fontSize: 18,
    },
    attributes: {

    }
})

export default ProductPage