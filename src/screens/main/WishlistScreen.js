import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; 

const FavoritesScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'tights', label: 'Tights' },
    { id: 'trousers', label: 'Trousers' },
    { id: 'tops', label: 'Tops' },
    { id: 'sweaters', label: 'Sweaters' },
    { id: 'kurtas', label: 'Kurtas' },
    { id: 'jackets', label: 'Jackets' },
  ];

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '1',
      brand: 'ZARA',
      name: 'Champagne Satin Ruched Mermaid Gown',
      price: '$450',
      size: 'M',
      rating: '4.5 | 25',
      image: require('../../../assets/images/wishlist/1.jpg')
    },
    {
      id: '2',
      brand: 'H&M',
      name: 'Champagne Satin Ruched Mermaid Gown',
      price: '$450',
      size: 'S',
      rating: '4.2 | 25',
      image: require('../../../assets/images/wishlist/2.jpg')
    },
    {
      id: '3',
      brand: 'Nike',
      name: 'Champagne Satin Ruched Mermaid Gown',
      price: '$450',
      size: 'L',
      rating: '4.8 | 25',
      image: 'https://via.placeholder.com/300x400',
    },
    {
      id: '4',
      brand: 'Adidas',
      name: 'Champagne Satin Ruched Mermaid Gown',
      price: '$540',
      size: 'M',
      rating: '4.3 | 25',
      image: 'https://via.placeholder.com/300x400',
    },
  ]);

  const handleEditPress = () => {
    if (isEditMode) {
      // If in edit mode and has selected items, delete them
      if (selectedItems.length > 0) {
        setDeleteModalVisible(true);
      } else {
        // Just exit edit mode
        setIsEditMode(false);
      }
    } else {
      // Enter edit mode
      setIsEditMode(true);
      setSelectedItems([]);
    }
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleCardPress = (item) => {
    if (isEditMode) {
      // Toggle selection
      if (selectedItems.includes(item.id)) {
        setSelectedItems(selectedItems.filter(id => id !== item.id));
      } else {
        setSelectedItems([...selectedItems, item.id]);
      }
    }
  };

  const confirmDelete = () => {
    if (selectedItems.length > 0) {
      setWishlistItems(wishlistItems.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      setIsEditMode(false);
      setDeleteModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleMoveToCart = (item) => {
    if (!isEditMode) {
      console.log('Move to cart:', item);
      // Add to cart logic here
    }
  };

  const renderWishlistItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => handleCardPress(item)}
        activeOpacity={0.7}
        disabled={!isEditMode}
      >
        {/* Image Container with overlays */}
        <View style={styles.imageContainer}>
          <Image 
            source={item.image} 
            style={styles.productImage}
            resizeMode="cover"
          />
          
          {/* Delete/Selection Icon - Top Right */}
          <TouchableOpacity 
            style={styles.selectionIcon}
            onPress={() => {
              if (!isEditMode) {
                setSelectedItem(item);
                setDeleteModalVisible(true);
              }
            }}
            activeOpacity={0.8}
          >
            {isEditMode ? (
              // Selection circle with checkmark in edit mode
              <View style={[styles.circle, isSelected && styles.circleSelected]}>
                {isSelected && <Feather name="check" size={14} color="#FFFFFF" />}
              </View>
            ) : (
              // Delete icon when not in edit mode
              <Image 
                source={require('../../../assets/images/wishlist/icons/delete.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
          
          {/* Size Badge - Bottom Left with Glassmorphism */}
          <View style={styles.sizeBadge}>
            <Text style={styles.sizeText}>{item.size}</Text>
          </View>
          
          {/* Rating Badge - Bottom Right with Glassmorphism */}
          <View style={styles.ratingBadge}>
            <FontAwesome name="star" size={12} color="#000000" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        {/* Product Details */}
        <View style={styles.productDetails}>
          <View style={styles.brandPriceRow}>
            <Text style={styles.brandName}>{item.brand}</Text>
            <View style={styles.priceContainer}>
               <Text style={styles.price}>{item.price}</Text>
               <Text style={styles.originalPrice}>$756</Text>
            </View>
          </View>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        </View>
        
        {/* Move to Cart Button */}
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => handleMoveToCart(item)}
          activeOpacity={0.8}
        >
          <Image 
            source={require('../../../assets/images/wishlist/icons/shopping-basket.png')} 
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={styles.cartButtonText}>Move to Cart</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditMode ? `Select Items (${selectedItems.length})` : 'Wishlist'}
          </Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={[styles.iconCircle, isEditMode && selectedItems.length > 0 && styles.deleteButtonActive]}
            onPress={handleEditPress}
            activeOpacity={0.8}
          >
            <Image 
              source={isEditMode ? require('../../../assets/images/wishlist/icons/delete.png') : require('../../../assets/images/wishlist/icons/pencil-edit.png')}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconCircle}
            onPress={handleCartPress}
            activeOpacity={0.8}
          >
            <Image 
              source={require('../../../assets/images/wishlist/icons/shopping-basket.png')}
              style={styles.headerIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Options */}
      {!isEditMode && (
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.filterChip,
                  selectedFilter === option.label && styles.filterChipActive
                ]}
                onPress={() => setSelectedFilter(option.label)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedFilter === option.label && styles.filterChipTextActive
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Wishlist Grid */}
      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
        />
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.emptyContainer}>
            <View style={styles.heartCircle}>
              <Feather name="heart" size={80} color="#FFDA64" />
            </View>
            
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            
            <Text style={styles.emptyText}>
              You Haven't Liked Any Items Yet. Start{'\n'}Browsing & Tap The Heart Icon To Save{'\n'}Outfits You Love.
            </Text>
            
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Text style={styles.exploreButtonText}>Start Browsing</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {selectedItems.length > 0 ? 'Remove Selected Items?' : 'Remove from Wishlist?'}
            </Text>
            
            <Text style={styles.modalMessage}>
              {selectedItems.length > 0 
                ? `${selectedItems.length} item(s) will be removed from your wishlist.`
                : `"${selectedItem?.name}" will be removed from your wishlist.`
              }
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelDelete}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.deleteButton]}
                onPress={confirmDelete}
                activeOpacity={0.8}
              >
                <Image 
                  source={require('../../../assets/images/wishlist/icons/delete.png')}
                  style={styles.modalIconImage}
                  resizeMode="contain"
                />
                <Text style={styles.deleteButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Monrope-SemiBold',
    fontWeight: '600',
    color: '#333',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButtonActive: {
    backgroundColor: '#FF4444',
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  // Filter Styles
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
  },
  filterScrollContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#D29D09',
    borderColor: '#D29D09',
  },
  filterChipText: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Monrope-Regular',
    color: '#D29D09',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  // Grid Styles
  gridContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: cardWidth * 1.3,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  selectionIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#000000',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D29D09',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSelected: {
    backgroundColor: '#D29D09',
    borderColor: '#D29D09',
  },
  iconImage: {
    width: 18,
    height: 18,
  },
  // Glassmorphism styles for Size Badge
  sizeBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  sizeText: {
    fontSize: 10,
    fontFamily: 'Monrope-Bold',
    fontWeight: '700',
    color: '#000000',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Glassmorphism styles for Rating Badge
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ratingText: {
    fontSize: 10,
    fontFamily: 'Monrope-Medium',
    fontWeight: '500',
    color: '#000000',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  productDetails: {
    padding: 10,
    gap: 4,
  },
  brandPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 12,
    fontFamily: 'Inter-Semibold',
    fontWeight: '600',
    color: '#000000',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontFamily: 'Monrope-Bold',
    color: '#000000',
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: 'Monrope-Regular',
    color: '#999',
    textDecorationLine: 'line-through',
  },
  productName: {
    fontSize: 13,
    fontFamily: 'Monrope-Medium',
    color: '#333',
    lineHeight: 18,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#D29D09',
    borderWidth: 1,
    borderColor: '#D29D09',
  },
  buttonIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  },
  cartButtonText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    flex: 1,
  },
  heartCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#fff4d4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: 'Monrope-SemiBold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Monrope-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  exploreButton: {
    backgroundColor: '#D29D09',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 15,
    minWidth: 450,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exploreButtonText: {
    fontSize: 16,
    fontFamily: 'Monrope-Medium',
    color: '#FFFFFF',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Monrope-SemiBold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    fontFamily: 'Monrope-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  deleteButton: {
    backgroundColor: '#D29D09',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Monrope-Medium',
    color: '#666',
  },
  deleteButtonText: {
    fontSize: 14,
    fontFamily: 'Monrope-SemiBold',
    color: '#FFFFFF',
  },
  modalIconImage: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
});

export default FavoritesScreen;