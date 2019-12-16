const DealerItem = ({item}) => {
  // const { description, title } = article;
  return (
    <ListItem
      roundAvatar
      title={`${item.first_name} ${item.last_name}`}
      subtitle={item.document_number}
      leftAvatar={{source: {uri: item.face_image}}}
      containerStyle={{borderBottomWidth: 0}}
      onPress={() => {
        navigate(item);
      }}
      keyExtractor={item => item.document_number}
      ItemSeparatorComponent={this.renderSeparator}
      ListHeaderComponent={this.renderHeader}
      ListFooterComponent={this.renderFooter}
      onRefresh={this.handleRefresh}
      refreshing={this.state.refreshing}
    />
  );
};
