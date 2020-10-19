import { Button, Card } from '@ui-kitten/components'
import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import axios from 'axios'

function MainScreen(props) {
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        axios.get('https://tecfood.herokuapp.com/api/restaurant').then(response => { 
            const filteredRestaurants = response.data.filter(restaurant => {
                return restaurant.availability
            })
            setRestaurants(filteredRestaurants)
        })
    }, [])

    return (
        <ScrollView>
            <Text>You are in the Main Screen</Text>
            {restaurants.map(restaurant => {
                return(
                    <Card key={restaurant._id}>
                        <Text>Name: {restaurant.name}</Text>
                        <Text>ID: {restaurant._id}</Text>
                        <Text>Manager: {restaurant.restManagerName}</Text>
                        <Text>Manager Phone: {restaurant.restManagerPhone}</Text>
                    </Card>
                )
            })}
        </ScrollView>
    )
}

export default MainScreen
