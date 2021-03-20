import React from 'react';
import {
  View, StyleSheet, Pressable, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Text from '../custom-components/Text';
import parseTime from '../utility/timeParser';
import { DELETE, FAVORITE } from '../../assets/values/images';
import { deleteImg } from '../storage/storage';
import { BLACK, SECONDARY_TEXT, WHITE } from '../../assets/values/colors';
import {
  SMALL_BORDER_WIDTH, SMALL_ICON_SIZE, SMALL_MARGIN, TINY_MARGIN,
} from '../../assets/values/dimensions';
import { refreshMedia } from '../redux/media/media.actions';

const DetailModal = ({ setIsDetailModal, details, refreshMediaGrid }) => (
  <>
    <Pressable style={styles.modalPressable} onPress={() => setIsDetailModal(false)} />
    <View style={[styles.detailContainer, details.style]}>
      <Text style={styles.detailText}>{details.name}</Text>
      <Text style={styles.detailTime}>{parseTime(details.createTime)}</Text>
      <View style={styles.detailIconContainer}>
        <TouchableOpacity
          onPress={() => console.log('ADD TO FAVORITE')}
        >
          <Image
            source={FAVORITE}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            deleteImg(details);
            setIsDetailModal(false);
            refreshMediaGrid();
          }}
        >
          <Image
            source={DELETE}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  modalPressable: { flex: 1 },
  detailContainer: {
    backgroundColor: WHITE,
    borderWidth: SMALL_BORDER_WIDTH,
    borderColor: BLACK,
    borderRadius: 3,
    padding: SMALL_MARGIN,
    opacity: 0.9,
    shadowColor: BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  detailText: {
    fontSize: 14,
  },
  detailTime: {
    fontSize: 13,
    color: SECONDARY_TEXT,
  },
  detailIconContainer: { flexDirection: 'row', justifyContent: 'flex-end' },
  icon: {
    width: SMALL_ICON_SIZE,
    height: SMALL_ICON_SIZE,
    marginTop: SMALL_MARGIN,
    marginLeft: TINY_MARGIN,
  },
});

const mapDispatchToProps = (dispatch) => ({
  refreshMediaGrid: () => dispatch(refreshMedia()),
});

export default connect(null, mapDispatchToProps)(DetailModal);
