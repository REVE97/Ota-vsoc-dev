<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>KATRI 신고</span>
    </section>
    <section class="search">
      <article>
        <strong>신고서 유형</strong>
        <div class="select">
          <select v-model="userInput.inputCategory">
            <option value="전체">전체</option>
            <option value="GENERAL">GENERAL</option>
            <option value="THREAT">THREAT</option>
          </select>
        </div>
        <strong>신고 번호</strong>
        <div class="input">
          <input 
            type="text" 
            v-model.number="userInput.inputNumber" 
            placeholder="신고 번호를 입력해주세요" />
        </div>
        <strong>신고 접수일</strong>
        <div class="input calendar">
          <Datepicker 
            v-model="userInput.inputDate"
            format="yyyy-MM-dd" 
            model-type="format"
            :enable-time-picker="false"
            :clearable="false"
            :hideInputIcon="true"
            locale="ko"></Datepicker>
          <label></label>
        </div>
        <strong>상태</strong>
        <div class="select">
          <select v-model="userInput.inputStatus">
            <option value="전체">전체</option>
            <option value="FINISH">FINISH</option>
            <option value="TEMP">TEMP</option>
            <option value="NEW">NEW</option>
          </select>
        </div>
        <div class="button">
          <button @click="search_on">검색</button>
        </div>
      </article>
    </section>
    <section class="content">
      <article class="group button">
        <button @click="router.push({ name: 'katri_general_create' })">사고 신고서 작성</button>
        <button @click="router.push({ name: 'katri_threat_create' })">위협 신고서 작성</button>
      </article>
      <article class="table">
        <table>
          <thead>
            <tr>
              <th>신고서 유형</th>
              <th>신고 번호</th>
              <th>제조사</th>
              <th>신고내용</th>
              <th>신고 접수일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in display">
              <td>{{ item.category }}</td>
              <td>
                <router-link 
                  v-if="item.category === 'GENERAL' " 
                  :to="{ name: 'katri_general_detail', params: { id: item.id } }">
                  {{ item.id }}
                </router-link>
                <router-link 
                  v-if="item.category === 'THREAT' " 
                  :to="{ name: 'katri_threat_detail', params: { id: item.id } }">
                  {{ item.id }}
                </router-link>
              </td>
              <td>{{ item.manufacturer }}</td>
              <td>
                <p style="text-align: center">{{ item.incidentReportContent }}</p>
              </td>
              <td>{{ getDate(item.createdAt) }}</td>
              <td>{{ item.status }}</td>
            </tr>
            <tr v-if="searchStatus === false && display.length === 0">
              <td colspan="6">먼저 검색 조건을 입력한 뒤 검색 버튼을 눌러주세요.</td>
            </tr>
            <tr v-if="searchStatus === true && display.length === 0">
              <td colspan="6">조건에 맞는 데이터가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getDate } from '@/common/common';
import axios from 'axios';
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const router = useRouter();

// 전체 데이터 상태값
const allData = ref([]);

// 사용자 입력 상태값
const userInput = ref({
  inputCategory: "전체",
  inputNumber: null,
  inputDate: "",
  inputStatus: "전체",
})

// 필터링에 적용할 데이터 상태값
const appliedSearchData = ref({
  inputCategory: "전체",
  inputNumber: null,
  inputDate: "",
  inputStatus: "전체",
})

// 사용자가 검색 중 데이터 상태값
const searchStatus = ref(false);

// 사용자 입력 필터링
const filteredData = computed(() => {
  return allData.value.filter( item => {
    const matchIncidentCategory = 
      appliedSearchData.value.inputCategory === "전체" ||
      !appliedSearchData.value.inputCategory ||
      item.category === appliedSearchData.value.inputCategory;

    const matchIncidentNumber = 
      !appliedSearchData.value.inputNumber ||
      item.id === appliedSearchData.value.inputNumber;
     
    const matchIncidentDate = 
      !appliedSearchData.value.inputDate ||
      getDate(item.createdAt) === appliedSearchData.value.inputDate;

    const matchIncidentStatus = 
      appliedSearchData.value.inputStatus === "전체" ||
      !appliedSearchData.value.inputStatus || 
      item.status === appliedSearchData.value.inputStatus;
    
    return matchIncidentCategory && matchIncidentNumber && matchIncidentDate && matchIncidentStatus;
  })
})

// 전체 데이터 / 필터링 데이터 구분 데이터
const display = computed(() => {
  if (!searchStatus.value) return [];
  return filteredData.value;
})

// 검색 버튼 활성화
const search_on = () => {
  appliedSearchData.value = {...userInput.value};
  searchStatus.value = true;
}

// 전체 데이터 Axios 호출
const getfetch_incident = async () => {
  try {
    const res = await axios.get('/api/vsoc/incidents');
    allData.value = res.data.data.incidents.list;
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

onMounted(getfetch_incident);
</script>