<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>권한 관리</span>
    </section>
    <section class="search">
      <article>
        <strong>이름</strong>
        <div class="input">
          <input 
            type="text" 
            v-model="userInput.inputName" 
            placeholder="이름을 입력해주세요." />
        </div>
        <strong>연락처</strong>
        <div class="input">
          <input 
            type="text" 
            v-model="userInput.inputId" 
            placeholder="연락처를 입력해주세요." />
        </div>
        <div class="button">
          <button @click="search_on">검색</button>
        </div>
      </article>
    </section>
    <section class="content">
      <article class="table">
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>연락처</th>
              <th>취약점 수집자</th>
              <th>모니터링 리포트</th>
              <th>KATRI 신고</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in display" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.id }}</td>
              <td class="radio">
                <input
                  type="radio"
                  name="vulnerabilityCollector"
                  :id="`vulnerabilityRadio-${item.id}`"
                  :value="item.id"
                  v-model="selectedVulnerabilityCollectorId"
                />
                <label :for="`vulnerabilityRadio-${item.id}`">
                  취약점 수집자
                </label>
              </td>
              <td class="checkbox">
                <input
                  type="checkbox"
                  :id="`monitoringCheckbox-${item.id}`"
                  v-model="item.roleChecked.monitoringReport"
                />
                <label :for="`monitoringCheckbox-${item.id}`">
                  모니터링 리포트
                </label>
              </td>
              <td class="checkbox">
                <input
                  type="checkbox"
                  :id="`katriCheckbox-${item.id}`"
                  v-model="item.roleChecked.katriIncident"
                />
                <label :for="`katriCheckbox-${item.id}`">
                  KATRI 신고
                </label>
              </td>
            </tr>
            <tr v-if="searchStatus === false && display.length === 0">
              <td colspan="5">먼저 검색 조건을 입력한 뒤 검색 버튼을 눌러주세요.</td>
            </tr>
            <tr v-if="searchStatus === true && display.length === 0">
              <td colspan="5">조건에 맞는 데이터가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button @click="postfetch_roleList">저장</button>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import axios from "axios";
import VsocModal from "../modal/VsocModal.vue";

const store = useAppStore();

// 권한 관리 조회 전체 데이터 상태값
const allData = ref([]);

// 사용자 검색 입력값 데이터 상태값
const userInput = ref({
  inputName: "",
  inputId: "",
});

// 필터링에 적용할 데이터 상태값
const appliedSearchData = ref({
  inputName: "",
  inputId: "",
})

// 취약점 수집자/모니터링 리포트/KATRI 신고 권한 값
const ROLE_VALUE = {
  vulnerability: 1,
  monitoringReport: 2,
  katriIncident: 4,
};

// 검색 모드 상태값
const searchStatus = ref(false);

// 취약점 수집자로 선택된 사용자
const selectedVulnerabilityCollectorId = ref("");

// 특정 권한 포함 여부 확인 (비트 연산자 사용)
const hasRole = (vsocRole, role) => {
  return (Number(vsocRole) & role) === role;
};

// 체크된 상태를 바탕으로 vsocRole 계산
const getVsocRoleValue = (item) => {
  let total = 0;
  if (selectedVulnerabilityCollectorId.value === item.id) {
    total += ROLE_VALUE.vulnerability;
  }
  if (item.roleChecked.monitoringReport) {
    total += ROLE_VALUE.monitoringReport;
  }
  if (item.roleChecked.katriIncident) {
    total += ROLE_VALUE.katriIncident;
  }
  return total;
};

// 필터링된 데이터 상태값
const filteredData = computed(() => {
  return allData.value.filter((item) => {
    const matchName =
      !appliedSearchData.value.inputName ||
      item.name.includes(appliedSearchData.value.inputName);

    const matchId =
      !appliedSearchData.value.inputId ||
      item.id.includes(appliedSearchData.value.inputId);

    return matchName && matchId;
  });
});

// 실제 출력 목록 (취약점 수집자 권한자 먼저 출력)
const display = computed(() => {
  if (!searchStatus.value) return [];

  const sorted = searchStatus.value ? filteredData.value : allData.value;

  return [...sorted].sort((a,b) => {
    return (
      Number(selectedVulnerabilityCollectorId.value === b.id) -
      Number(selectedVulnerabilityCollectorId.value === a.id)
    )
  });
});

// 검색 모드 실행
const search_on = () => {
  appliedSearchData.value = {...userInput.value};
  searchStatus.value = true;
};

// 권한 관리 조회 API 호출
const getfetch_roleList = async () => {
  try {
    const res = await axios.get("/api/vsoc/roles");
    const list = res.data.data.roleList.list;

    allData.value = list.map((item) => {
      const vsocRole = Number(item.vsocRole) || 0;
      return {
        ...item,
        roleChecked: {
          monitoringReport: hasRole(vsocRole, ROLE_VALUE.monitoringReport),
          katriIncident: hasRole(vsocRole, ROLE_VALUE.katriIncident),
        },
      };
    });

    // 취약점 수집자 권한 가진 사람 1명 찾기
    const vulnerabilityUser = list.find((item) =>
      hasRole(item.vsocRole, ROLE_VALUE.vulnerability)
    );

    selectedVulnerabilityCollectorId.value = vulnerabilityUser
      ? vulnerabilityUser.id
      : "";
  } catch (error) {
    console.error(error);
    alert("데이터 불러오기 실패");
  }
};

// 권한 관리 업데이트 저장 API 호출
const postfetch_roleList = async () => {
  try {
    const payload = {
      roleList: allData.value.map((item) => ({
        id: item.id,
        name: item.name,
        vsocRole: getVsocRoleValue(item),
      })),
    };
    const res = await axios.post("/api/vsoc/roles", payload);
    if (res.data.resultCode == -1){
      alert('권한 관리 업데이트 실패');
    } else {
      openSaveDone();
    }
    await getfetch_roleList();
  } catch (error) {
    console.error(error);
    alert("권한 관리 업데이트 실패");
  }
};

// modal
const openSaveDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "저장되었습니다.",
    btnText: "확인",

    rightBtn: () => {}
  })
};

onMounted(getfetch_roleList);
</script>
