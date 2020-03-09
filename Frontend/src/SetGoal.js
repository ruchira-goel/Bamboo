          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Dropdown
            label="Goal Options"
            data={this.state.goalOptions}
            onChangeText={value => {
              this.setState({goalSelected: value});
            }}
            selectedItemColor="#3eb245"
            containerStyle={{width: '50%'}}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Dropdown
            label="Duration type"
            data={durationOpts}
            onChangeText={value => {
              this.setState({duration: value});
            }}
            selectedItemColor="#3eb245"
            containerStyle={{width: '50%'}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '500',
    flex: 1,
    marginTop: '7%',
  },
  title: {
    margin: 12,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationColor: 'gray',
  },
  container: {
    flex: 1,
    //width: '40%',
    //height: '20%',
    alignItems: 'center',
    alignContent: 'center',
    //backgroundColor: 'blue',
    //marginBottom: '70%',
    //marginLeft: '30%',
  },
  spacingHigh: {
    padding: 15,
  },
  spacingSmall: {
    padding: 10,
  },
  fieldText: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '25%',
    marginRight: '25%',
    borderBottomWidth: 0.5,
  },
  alignLeftView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  linkStyle: {
    marginBottom: '70%',
    padding: 15,
  },
  /*textalign for the text to be in the center for "bamboo."*/
});
