import React from 'react'; 
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
} from 'react-native'; 
 
import { 
  MaterialIcons, 
  FontAwesome5, 
  Ionicons, 
} from '@expo/vector-icons'
 
import { useNavigation } from '@react-navigation/native'; 
import Header from '../components/Header'; 
 
export default function HomeScreen() { 

  const navigation = useNavigation();
 
  // ========================= 
  // DATA ATUAL 
  // ========================= 
 
  const hoje = new Date(); 
 
  const inicioSemana = new Date(hoje); 
 
  inicioSemana.setDate( 
    hoje.getDate() - hoje.getDay() 
  ); 
 
  const diasSemana = Array.from( 
    { length: 7 }, 
    (_, index) => { 
 
      const data = new Date(inicioSemana); 
 
      data.setDate( 
        inicioSemana.getDate() + index 
      ); 
 
      return data; 
    } 
  ); 
 
  const nomesDias = [ 
    'Dom', 
    'Seg', 
    'Ter', 
    'Qua', 
    'Qui', 
    'Sex', 
    'Sáb' 
  ]; 
 
  const formatarData = (data) => { 
 
    return data.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
    }); 
 
  }; 
 
  return ( 
 
    <View style={styles.container}> 
 
      {/* ========================= 
          CABEÇALHO 
      ========================= */} 
 
      <Header title="Início" /> 
 
 
      {/* ========================= 
          CONTEÚDO 
      ========================= */} 
 
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent} 
      > 
 
        {/* ========================= 
            CALENDÁRIO 
        ========================= */} 
 
        <View style={styles.section}> 
 
          <View style={styles.sectionTitle}> 
 
            <MaterialIcons 
              name="calendar-month" 
              size={19} 
              color="#6B1D25" 
            /> 
 
            <Text style={styles.title}> 
              Calendário 
            </Text> 
 
            <Text style={styles.arrows}> 
              ›› 
            </Text> 
 
          </View> 
 
 
          {/* BARRA DA SEMANA */} 
 
          <View style={styles.calendarHeader}> 
 
            <Text style={styles.arrowLeft}> 
              ‹ 
            </Text> 
 
            <Text style={styles.calendarMonth}> 
              {formatarData(diasSemana[0])} 
              {' - '} 
              {formatarData(diasSemana[6])} 
            </Text> 
 
            <Text style={styles.arrowRight}> 
              › 
            </Text> 
 
          </View> 
 
 
          {/* CALENDÁRIO */} 
 
          <View style={styles.calendar}> 
 
            {diasSemana.map((data, index) => { 
 
              const ehHoje = 
                data.toDateString() === 
                hoje.toDateString(); 
 
              return ( 
 
                <View 
                  key={data.toISOString()} 
                  style={styles.calendarColumn} 
                > 
 
                  <Text style={styles.day}> 
                    {nomesDias[index]} 
                  </Text> 
 
 
                  <View 
                    style={ 
                      ehHoje 
                        ? styles.activeDay 
                        : styles.dayBox 
                    } 
                  > 
 
                    <Text 
                      style={ 
                        ehHoje 
                          ? styles.activeDayText 
                          : styles.dayNumber 
                      } 
                    > 
                      {data.getDate()} 
                    </Text> 
 
                  </View> 
 
                  {/* EVENTO NO DIA */} 
 
                  {index === 1 && ( 
                    <View style={styles.blueEvent}> 
                      <Text style={styles.blueEventText}> 
                        ✝ Missa 
                      </Text> 
                      <Text style={styles.blueEventHour}> 
                        19:00 
                      </Text> 
                    </View> 
                  )} 
 
                  {index === 6 && ( 
                    <View style={styles.orangeEvent}> 
                      <Text style={styles.orangeEventText}> 
                        ♪ Noite de 
                      </Text> 
                      <Text style={styles.orangeEventText}> 
                        Louvor 
                      </Text> 
                    </View> 
                  )} 
 
                </View> 
 
              ); 
 
            })} 
 
          </View> 
 
 
          {/* CALENDÁRIO COMPLETO */} 
 
          <TouchableOpacity 
            style={styles.fullCalendar}
            onPress={() => navigation.navigate('Calendario')}
          > 
 
            <Text style={styles.fullCalendarLine}> 
              ───────── 
            </Text> 
 
            <Text style={styles.link}> 
              ‹ Ver calendário completo › 
            </Text> 
 
            <Text style={styles.fullCalendarLine}> 
              ───────── 
            </Text> 
 
          </TouchableOpacity> 
 
        </View> 
 
 
        {/* ========================= 
            PRÓXIMOS EVENTOS 
        ========================= */} 
 
        <View style={styles.section}> 
 
          <View style={styles.sectionTitle}> 
 
            <MaterialIcons 
              name="calendar-month" 
              size={19} 
              color="#6B1D25" 
            /> 
 
            <Text style={styles.title}> 
              Próximos Eventos 
            </Text> 
 
          </View> 
 
 
          <View style={styles.eventCard}> 
 
            <View style={styles.eventRow}> 
 
              <View style={styles.eventIcon}> 
                <FontAwesome5 
                  name="church" 
                  size={14} 
                  color="#6B1D25" 
                /> 
              </View> 
 
              <Text style={styles.eventTitle}> 
                Noite de Louvor 
              </Text> 
 
            </View> 
 
 
            <View style={styles.infoRow}> 
 
              <MaterialIcons 
                name="calendar-today" 
                size={15} 
                color="#5D514B" 
              /> 
 
              <Text style={styles.info}> 
                11 de maio 
              </Text> 
 
            </View> 
 
 
            <View style={styles.infoRow}> 
 
              <Ionicons 
                name="location-outline" 
                size={17} 
                color="#5D514B" 
              /> 
 
              <Text style={styles.info}> 
                Igreja Matriz 
              </Text> 
 
            </View> 
 
 
            <View style={styles.infoRow}> 
 
              <Ionicons 
                name="time-outline" 
                size={17} 
                color="#5D514B" 
              /> 
 
              <Text style={styles.info}> 
                20:00 hr 
              </Text> 
 
            </View> 
 
 
            <View style={styles.infoRow}> 
 
              <MaterialIcons 
                name="info-outline" 
                size={17} 
                color="#5D514B" 
              /> 
 
              <Text style={styles.info}> 
                Evento especial 
              </Text> 
 
            </View> 
 
          </View> 
 
        </View> 
 
 
        {/* ========================= 
            AVISOS 
        ========================= */} 
 
        <View style={styles.section}> 
 
          <View style={styles.sectionTitle}> 
 
            <Ionicons 
              name="notifications" 
              size={19} 
              color="#6B1D25" 
            /> 
 
            <Text style={styles.title}> 
              Avisos Paroquiais 
            </Text> 
 
          </View> 
 
 
          {/* AVISO 1 */} 
 
          <TouchableOpacity style={styles.notice}> 
 
            <View style={styles.noticeIcon}> 
 
              <FontAwesome5 
                name="church" 
                size={13} 
                color="#806F63" 
              /> 
 
            </View> 
 
            <View style={styles.noticeContent}> 
 
              <Text style={styles.noticeTitle}> 
                Inscrições para batismo abertas 
              </Text> 
 
              <Text style={styles.noticeDate}> 
                Até 30 de maio 
              </Text> 
 
            </View> 
 
            <Text style={styles.noticeArrow}> 
              › 
            </Text> 
 
          </TouchableOpacity> 
 
 
          {/* AVISO 2 */} 
 
          <TouchableOpacity style={styles.notice}> 
 
            <View style={styles.noticeIcon}> 
 
              <FontAwesome5 
                name="church" 
                size={13} 
                color="#806F63" 
              /> 
 
            </View> 
 
            <View style={styles.noticeContent}> 
 
              <Text style={styles.noticeTitle}> 
                Festa da padroeira neste domingo 
              </Text> 
 
              <Text style={styles.noticeDate}> 
                Dia 8 de maio 
              </Text> 
 
            </View> 
 
            <Text style={styles.noticeArrow}> 
              › 
            </Text> 
 
          </TouchableOpacity> 
 
        </View> 
 
      </ScrollView> 
 
 
      {/* ========================= 
          MENU INFERIOR 
      ========================= */} 
 
      <View style={styles.bottomMenu}> 
 
        <TouchableOpacity style={styles.menuItem}> 
 
          <Ionicons 
            name="home" 
            size={21} 
            color="#FFF" 
          /> 
 
          <Text style={styles.menuText}> 
            Início 
          </Text> 
 
        </TouchableOpacity> 
 
 
        <TouchableOpacity style={styles.menuItem}> 
 
          <MaterialIcons 
            name="calendar-month" 
            size={22} 
            color="#FFF" 
          /> 
 
          <Text style={styles.menuText}> 
            Calendário 
          </Text> 
 
        </TouchableOpacity> 
 
 
        <TouchableOpacity style={styles.menuItem}> 
 
          <FontAwesome5 
            name="church" 
            size={20} 
            color="#FFF" 
          /> 
 
          <Text style={styles.menuText}> 
            Agend. 
          </Text> 
 
        </TouchableOpacity> 
 
 
        <TouchableOpacity style={styles.menuItem}> 
 
          <Ionicons 
            name="notifications" 
            size={21} 
            color="#FFF" 
          /> 
 
          <Text style={styles.menuText}> 
            Avisos 
          </Text> 
 
        </TouchableOpacity> 
 
 
        <TouchableOpacity style={styles.menuItem}> 
 
          <Ionicons 
            name="person" 
            size={21} 
            color="#FFF" 
          /> 
 
          <Text style={styles.menuText}> 
            Perfil 
          </Text> 
 
        </TouchableOpacity> 
 
      </View> 
 
    </View> 
  ); 
} 
 
 
const styles = StyleSheet.create({ 
 
  // ========================= 
  // CONTAINER 
  // ========================= 
 
  container: { 
    flex: 1, 
    backgroundColor: '#F5F0EA', 
  }, 
 
 
  scrollContent: { 
    paddingBottom: 75, 
  }, 
 
 
  // ========================= 
  // SEÇÕES 
  // ========================= 
 
  section: { 
    paddingHorizontal: 18, 
    paddingTop: 10, 
  }, 
 
 
  sectionTitle: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 7, 
  }, 
 
 
  title: { 
    marginLeft: 6, 
    fontSize: 14, 
    color: '#6B1D25', 
    fontWeight: '500', 
  }, 
 
 
  arrows: { 
    marginLeft: 'auto', 
    color: '#B19A88', 
    fontSize: 18, 
  }, 
 
 
  // ========================= 
  // CABEÇALHO DO CALENDÁRIO 
  // ========================= 
 
  calendarHeader: { 
    height: 30, 
    backgroundColor: '#8A1630', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 8, 
  }, 
 
 
  calendarMonth: { 
    color: '#FFF', 
    fontSize: 11, 
    fontWeight: '600', 
  }, 
 
 
  arrowLeft: { 
    color: '#FFF', 
    fontSize: 23, 
    lineHeight: 23, 
  }, 
 
 
  arrowRight: { 
    color: '#FFF', 
    fontSize: 23, 
    lineHeight: 23, 
  }, 
 
 
  // ========================= 
  // CALENDÁRIO 
  // ========================= 
 
  calendar: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderLeftWidth: 1, 
    borderRightWidth: 1, 
    borderColor: '#DED5CE', 
  }, 
 
 
  calendarColumn: { 
    width: '14.285%', 
    minHeight: 74, 
    alignItems: 'center', 
    borderRightWidth: 1, 
    borderBottomWidth: 1, 
    borderColor: '#DED5CE', 
    paddingTop: 5, 
  }, 
 
 
  day: { 
    fontSize: 10, 
    fontWeight: '600', 
    color: '#5D4141', 
  }, 
 
 
  dayBox: { 
    width: 25, 
    height: 25, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 5, 
  }, 
 
 
  dayNumber: { 
    color: '#5D514B', 
    fontSize: 12, 
  }, 
 
 
  activeDay: { 
    width: 25, 
    height: 25, 
    borderRadius: 13, 
    backgroundColor: '#8A1630', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 5, 
  }, 
 
 
  activeDayText: { 
    color: '#FFF', 
    fontSize: 12, 
    fontWeight: 'bold', 
  }, 
 
 
  // ========================= 
  // EVENTOS NO CALENDÁRIO 
  // ========================= 
 
  blueEvent: { 
    backgroundColor: '#244B72', 
    width: 31, 
    paddingVertical: 2, 
    marginTop: 2, 
    alignItems: 'center', 
  }, 
 
 
  blueEventText: { 
    color: '#FFF', 
    fontSize: 6, 
  }, 
 
 
  blueEventHour: { 
    color: '#FFF', 
    fontSize: 5, 
  }, 
 
 
  orangeEvent: { 
    backgroundColor: '#B86432', 
    width: 31, 
    paddingVertical: 3, 
    marginTop: 2, 
    alignItems: 'center', 
  }, 
 
 
  orangeEventText: { 
    color: '#FFF', 
    fontSize: 5.5, 
  }, 
 
 
  // ========================= 
  // CALENDÁRIO COMPLETO 
  // ========================= 
 
  fullCalendar: { 
    backgroundColor: '#FFF', 
    borderWidth: 1, 
    borderTopWidth: 0, 
    borderColor: '#DED5CE', 
    minHeight: 35, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
  }, 
 
 
  fullCalendarLine: { 
    color: '#D8CBC0', 
    fontSize: 7, 
    marginHorizontal: 4, 
  }, 
 
 
  link: { 
    color: '#6B1D25', 
    fontSize: 12, 
    fontWeight: '500', 
  }, 
 
 
  // ========================= 
  // EVENTO 
  // ========================= 
 
  eventCard: { 
    backgroundColor: '#FFF', 
    borderWidth: 1, 
    borderColor: '#D9CEC5', 
    padding: 9, 
    marginBottom: 3, 
    borderRadius: 3, 
  }, 
 
 
  eventRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 5, 
  }, 
 
 
  eventIcon: { 
    width: 19, 
    height: 19, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 5, 
  }, 
 
 
  eventTitle: { 
    color: '#9A3F15', 
    fontSize: 13, 
    fontWeight: '600', 
  }, 
 
 
  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 2, 
  }, 
 
 
  info: { 
    color: '#282323', 
    fontSize: 11, 
    marginLeft: 5, 
  }, 
 
 
  // ========================= 
  // AVISOS 
  // ========================= 
 
  notice: { 
    minHeight: 48, 
    backgroundColor: '#FFF', 
    borderWidth: 1, 
    borderColor: '#D9CEC5', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 7, 
    marginBottom: 2, 
    borderRadius: 3, 
  }, 
 
 
  noticeIcon: { 
    width: 24, 
    height: 24, 
    borderRadius: 4, 
    backgroundColor: '#E9E0D8', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 6, 
  }, 
 
 
  noticeContent: { 
    flex: 1, 
  }, 
 
 
  noticeTitle: { 
    color: '#59413B', 
    fontSize: 10.5, 
    fontWeight: '500', 
  }, 
 
 
  noticeDate: { 
    color: '#8B817B', 
    fontSize: 9, 
    marginTop: 1, 
  }, 
 
 
  noticeArrow: { 
    color: '#9B7655', 
    fontSize: 25, 
    marginLeft: 5, 
  }, 
 
 
  // ========================= 
  // MENU INFERIOR 
  // ========================= 
 
  bottomMenu: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
 
    height: 59, 
 
    backgroundColor: '#8A1630', 
 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
 
    borderTopWidth: 1, 
    borderTopColor: '#D8B36A', 
  }, 
 
 
  menuItem: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
  }, 
 
 
  menuText: { 
    color: '#FFF', 
    fontSize: 8.5, 
    marginTop: 2, 
  }, 
 
}); 