import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import styles from './Style';
import RealmServices from '../../services/RealmServices';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/selectors/userSelectors';
import { fetchProductsRequest } from '../../store/reducers/productReducer';

const HomeScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    console.log(products, 'products')
    const userData = useSelector(getUser);

    const user = route?.params?.user;

    const [contents, setContents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, [dispatch]);
    useEffect(() => {
        // Initialize Realm when the component mounts
        const initializeRealm = async () => {
            await RealmServices.initialize();
        };

        initializeRealm();

        return () => {
            // Clean up when the component unmounts
            RealmServices.close();
        };
    }, []);

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };
    const loadContents = async () => {
        setIsLoading(true);
        try {
            const userContents = await RealmServices.getContentByUser(user.id);
            console.log('Contents from Realm:', JSON.stringify(userContents, null, 2)); // 🔍 Debug log
            setContents([...userContents]);
        } catch (error) {
            console.error('Error loading contents:', error);
            Alert.alert('Error', 'Failed to load your content');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadContents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    useEffect(() => {
        const loadData = async () => {
            await RealmServices.addInitialProducts(); // ✅ Ensure products are stored
            const storedProducts = await RealmServices.getProducts();
            console.log('Products from Realm:', JSON.stringify(storedProducts, null, 2)); // 🔍 Debug log
            setContents([...storedProducts]);
        };
        loadData();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            {cart.find((cartItem) => cartItem.id === item.id) ? (
                <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.addButtonList} onPress={() => addToCart(item)}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            )}
        </View>
    );
    console.log(userData, 'user');
    return (
        <View style={styles.containerList}>
            <Text style={styles.title}>Shop Products</Text>
            <Text>{user?.name}</Text>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
            <FlatList
                //data={contents}
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}

            />
        </View>
    );
};



export default HomeScreen;