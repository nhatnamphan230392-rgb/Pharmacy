import { StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '@utils';
import { FontWeight } from '@services';
import { Colors } from '../OrderScreen/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_LIGHT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(12),
    backgroundColor: Colors.BACKGROUND_WHITE,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_LIGHT,
  },
  backButton: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  backIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    tintColor: Colors.PRIMARY_BLUE,
  },
  headerTitle: {
    fontSize: scaleFont(20),
    ...FontWeight.FONT_WEIGHT_600,
    color: Colors.TEXT_DARK,
  },
  headerRight: {
    width: scaleWidth(40),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(16),
    paddingBottom: scaleHeight(280),
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: Colors.BACKGROUND_WHITE,
    borderRadius: scaleWidth(8),
    padding: scaleWidth(12),
    marginBottom: scaleHeight(12),
    shadowColor: Colors.SHADOW_BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    marginRight: scaleWidth(12),
  },
  productImagePlaceholder: {
    width: scaleWidth(60),
    height: scaleWidth(60),
    borderRadius: scaleWidth(8),
    backgroundColor: Colors.BACKGROUND_QUANTITY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageText: {
    fontSize: scaleFont(24),
  },
  productDetails: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(4),
    flexWrap: 'nowrap',
  },
  productNameContainer: {
    flexDirection: 'row',
    gap: scaleWidth(1),
    alignItems: 'center',
    flexShrink: 1,
  },
  productName: {
    fontSize: scaleFont(16),
    ...FontWeight.FONT_WEIGHT_500,
    color: Colors.TEXT_DARK,
    marginRight: scaleWidth(2),
    flexShrink: 1,
  },
  rxTag: {
    backgroundColor: Colors.PRIMARY_BLUE_LIGHT,
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(4),
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  rxText: {
    fontSize: scaleFont(10),
    ...FontWeight.FONT_WEIGHT_500,
    color: Colors.TEXT_WHITE,
  },
  productCategory: {
    fontSize: scaleFont(14),
    color: Colors.TEXT_LIGHT_GRAY,
    marginBottom: scaleHeight(4),
  },
  unitPrice: {
    fontSize: scaleFont(14),
    ...FontWeight.FONT_WEIGHT_400,
    color: Colors.ACCENT_RED,
  },
  priceQuantity: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  totalPrice: {
    fontSize: scaleFont(16),
    ...FontWeight.FONT_WEIGHT_500,
    color: Colors.TEXT_DARK,
    marginBottom: scaleHeight(4),
  },
  quantity: {
    fontSize: scaleFont(14),
    ...FontWeight.FONT_WEIGHT_400,
    color: Colors.TEXT_GRAY,
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.BACKGROUND_WHITE,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER_LIGHT,
    shadowColor: Colors.SHADOW_BLACK,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(16),
    paddingBottom: scaleHeight(16),
  },
  orderSummary: {
    paddingBottom: scaleHeight(12),
  },
  summaryDivider: {
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER_LIGHT,
    borderStyle: 'dashed',
    marginBottom: scaleHeight(16),
  },
  summaryTitle: {
    fontSize: scaleFont(18),
    ...FontWeight.FONT_WEIGHT_600,
    color: Colors.TEXT_DARK,
    marginBottom: scaleHeight(12),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(8),
  },
  summaryLabel: {
    fontSize: scaleFont(14),
    ...FontWeight.FONT_WEIGHT_400,
    color: Colors.TEXT_GRAY,
  },
  summaryValue: {
    fontSize: scaleFont(14),
    ...FontWeight.FONT_WEIGHT_500,
    color: Colors.TEXT_DARK,
  },
  summaryLabelTotal: {
    fontSize: scaleFont(16),
    ...FontWeight.FONT_WEIGHT_600,
    color: Colors.TEXT_DARK,
  },
  summaryValueTotal: {
    fontSize: scaleFont(18),
    ...FontWeight.FONT_WEIGHT_600,
    color: Colors.ACCENT_RED,
  },
  buttonContainer: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  confirmButton: {
    width: '100%',
    paddingVertical: scaleHeight(14),
    backgroundColor: Colors.PRIMARY_BLUE,
    borderRadius: scaleWidth(8),
  },
});
