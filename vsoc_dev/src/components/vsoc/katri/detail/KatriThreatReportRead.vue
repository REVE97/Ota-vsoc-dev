<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>KATRI 신고</span>
      <span>위협 신고서 조회</span>
    </section>
    <section class="page">
      <article class="table">
        <strong>사고 위협 신고</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>신고 번호</th>
              <td>{{ allData?.id }}</td>
              <th>신고 접수일</th>
              <td>{{ getDate(allData?.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>사고 신고자 기본 정보</strong>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>제조사</th>
              <td>{{ allData?.manufacturer }}</td>
              <th>담당자</th>
              <td>{{ allData?.name }}</td>
            </tr>
            <tr>
              <th>전자우편</th>
              <td>{{ allData?.email }}</td>
              <th>연락처</th>
              <td>{{ allData?.phone }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="table">
        <strong>위협 신고 내역</strong>
        <table>
          <colgroup>
            <col width="200px" />
            <col width="280px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>신고 내용</th>
              <td colspan="2">
                <div class="group">
                  {{ allData?.incidentReportContent }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.incidentReportContent)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="2">위협 일시</th>
              <th>사이버보안 위협 발생 일시</th>
              <td>{{ getDate(allData?.threatOccurrenceDate) }}</td>
            </tr>
            <tr>
              <th>사이버보안 위협 감지 일시</th>
              <td>{{ getDate(allData?.threatDetectionDate) }}</td>
            </tr>
            <tr>
              <th rowspan="4">위협 유형 및 정도</th>
              <th>위협 유형 (STRID+S)</th>
              <td>
                <div class="group">
                  {{ allData?.threatType }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.threatType)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>정보통신망법 침해사고 해당여부</th>
              <td>
                <div class="group">
                  {{ parsingIsnetworklawviol }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(parsingIsnetworklawviol)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>위협 감지 방법</th>
              <td>
                <div class="group">
                  {{ allData?.detectionMethod }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.detectionMethod)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>위협 정보 출처 (링크or정보)</th>
              <td>
                <div class="group">
                  {{ allData?.infoSource }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.infoSource)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="4">위협 대상</th>
              <th>위협 대상 구분</th>
              <td>
                <div class="group">
                  {{ allData?.targetCategory }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.targetCategory)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>차종</th>
              <td>
                <div class="group">
                  {{ allData?.vehModel }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.vehModel)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>부품/시스템</th>
              <td>
                <div class="group">
                  {{ allData?.partSystem }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.partSystem)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>(차량 외부)서비스 시스템</th>
              <td>
                <div class="group">
                  {{ allData?.serviceSystem }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.serviceSystem)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th rowspan="3">위협 범위</th>
              <th>위협 노출 차량 대수</th>
              <td>
                <div class="group">
                  {{ allData?.affectedVehCnt }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.affectedVehCnt)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>위협 노출 사람 수</th>
              <td>
                <div class="group">
                  {{ allData?.affectedPersonCnt }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.affectedPersonCnt)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>위협 발생 시간 (종료,계속)</th>
              <td>
                <div class="group">
                  {{ allData?.threatOccurrenceTime }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.threatOccurrenceTime)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>위협 내용</th>
              <td colspan="2">
                <div class="group">
                  {{ allData?.threatContent }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.threatContent)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>위협 방어/조치 내용</th>
              <td colspan="2">
                <div class="group">
                  {{ allData?.remedyContent }}
                  <div class="button">
                    <button class="icon copy" @click="copyText(allData.remedyContent)"></button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td 
                class="group" 
                v-for="item in incidnetThreatFileList">
                파일명 : {{ item.originalName }} / {{ item.fileCategoryDescription }}
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <router-link 
          :to="{ name: 'threat_report_update', params: { id: route.params.id }}">
          <button :disabled="!route.params.id">수정</button>
        </router-link>
        <button class="red line" @click="openDeleteConfirm">삭제</button>
        <button class="line" @click="router.push({ name: 'katri_management' })">목록</button>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';

const router = useRouter();
const route = useRoute();
const store = useAppStore();

// KATRI 위협 신고서 상세조회 전체 데이터
const allData = ref(null);

// 정보통신망법 침해사고 해당여부 1 -> Y / 0 -> N paring 처리
const parsingIsnetworklawviol = computed(() => {
  if(allData?.value?.isNetworkLawViolation === 1) return "Y";
  if(allData?.value?.isNetworkLawViolation === 0) return "N";
  return "";
});

// 위협 신고서 접수 자료 파싱
const incidnetThreatFileList = computed(() => {
  return allData.value?.fileList?.filter( item => item.fileCategoryDescription === "위협 신고서 접수 자료")})

// 신고 접수일 parsing 처리
const padZero = (num) => String(num).padStart(2, "0");

const formatDate = (date, includeTime = true) => {
  const yyyy = date.getFullYear();
  const MM = padZero(date.getMonth() + 1);
  const dd = padZero(date.getDate());
  let formattedDate = `${yyyy}-${MM}-${dd}`;

  if (includeTime) {
    const hh = padZero(date.getHours());
    const mm = padZero(date.getMinutes());
    formattedDate += ` ${hh}:${mm}`;
  }

  return formattedDate;
};

const getDate = (dateString) => formatDate(new Date(dateString));

// KATRI 위협 신고서 상세조회 API 호출
const getfetch_threat_detail = async() => {
  try {
    const incidentId = Number(route.params.id);
    const res = await axios.get(`/api/vsoc/incident/${incidentId}/THREAT`);
    allData.value = res.data.data.incidentThreat;
    if(res.data.resultCode === -1){
      alert('데이터 불러오기 실패');
    }
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// KATRI 위협 신고서 삭제 API 호출
const deletefetch_threat_detail = async () => {
  try {
    const incidentId = Number(route.params.id)
    await axios.post(`/api/vsoc/incident/${incidentId}/THREAT`);
  } catch (error) {
    console.error(error);
    alert('위협 신고서 삭제에 실패하였습니다.');
  }
}

// 해당 텍스트 클립보드 복사 기능
const copyText = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    alert('복사 되었습니다.');
  } catch (error) {
    console.error(error);
    alert('복사 실패');
  }
}

// modal
const goList = () => router.replace({ name: "katri_management" });

const openDeleteConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "warning",
    textArea: "위협 신고서를 삭제하시겠습니까?",

    rightBtn: async() => { 
      await deletefetch_threat_detail();
      openDeleteDone(); 
    },
  })
};

const openDeleteDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "삭제 되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

onMounted(getfetch_threat_detail);
</script>
